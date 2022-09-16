import Sinon from "sinon";
import { AxiosClientImpl } from "../../../utils/HttpClient/classes/AxiosClient";
import { HTTPRequest, IHTTPClient } from "../../../utils/HttpClient/interface";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import env from "env-var";
import { User } from "../../Authentication/entities";
import { CarOnSaleClientApi } from "./CarOnSaleClient";
import { Auction } from "../entities";
import assert from "assert";

const auctionResponse: Auction[] = [
  {
    uuid: "14dd0028-1e41-428e-8f2e-db071a2a6bdc",
    state: 2,
    endingTime: "2022-09-16T15:06:00.000Z",
    remainingTimeInSeconds: 97759,
    remainingTimeForInstantPurchaseInSeconds: null,
    instantPurchasePossibleUntil: null,
    _fk_uuid_highestBiddingBuyerUser: null,
    currentHighestBidValue: 95,
    currentHighestBidValueNet: 0,
    minimumRequiredAsk: 14439,
    minimumRequiredAskNet: 12133.6134453782,
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
];

const makeSut = (): { sut: ICarOnSaleClient; httpClient: IHTTPClient } => {
  const httpClient = new AxiosClientImpl("https://www.baseUrl.com");
  const sut = new CarOnSaleClientApi(() => httpClient);
  return { sut, httpClient };
};
describe("CarOnSaleClientApi", () => {
  before(() => {
    process.env.COS_USEREMAIL = "test@gmail.com";
  });
  it("Should execute the httpClient at least once", async () => {
    const userId = env.get("COS_USEREMAIL").required().asString();
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
    };
    const { sut, httpClient } = makeSut();
    const spy = Sinon.stub(httpClient, "get").resolves({
      statusCode: 200,
      data: auctionResponse,
    });
    await sut.getRunningAuctions(request);
    Sinon.assert.calledOnce(spy);
  });
  it("Should execute the httpClient with correct arguments", async () => {
    const { sut, httpClient } = makeSut();
    const spy = Sinon.stub(httpClient, "get").resolves({
      statusCode: 200,
      data: auctionResponse,
    });
    const userId = env.get("COS_USEREMAIL").required().asString();
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
    };
    await sut.getRunningAuctions(request);
    Sinon.assert.calledWith(spy, request);
  });
  it("Should execute with correct arguments if the new user is provided instead a env var user", async () => {
    const { sut, httpClient } = makeSut();
    const spy = Sinon.stub(httpClient, "get").resolves({
      statusCode: 200,
      data: auctionResponse,
    });
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
    };
    await sut.getRunningAuctions(request);
    Sinon.assert.calledWith(spy, request);
  });
  it("should call the get method with correct request headers", async () => {
    const { sut, httpClient } = makeSut();
    const spy = Sinon.stub(httpClient, "get").resolves({
      statusCode: 200,
      data: auctionResponse,
    });
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    await sut.getRunningAuctions(request);
    Sinon.assert.calledWith(spy, request);
  });
  it("Should return a correct the number of auctions if there is 1 auction", async () => {
    const { sut, httpClient } = makeSut();

    Sinon.stub(httpClient, "get").resolves({
      statusCode: 200,
      data: auctionResponse,
    });
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    const response = await sut.getRunningAuctions(request);
    assert.strictEqual(response.auctionsAmount, 1);
  });
  it("Should return a correct the number of auctions if there is 2 auction", async () => {
    const { sut, httpClient } = makeSut();
    Sinon.stub(httpClient, "get").resolves({
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
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
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
        {
          uuid: "14dd0028-1e41-428e-8f2e-db071a2a6bdc",
          state: 2,
          endingTime: "2022-09-16T15:06:00.000Z",
          remainingTimeInSeconds: 97759,
          remainingTimeForInstantPurchaseInSeconds: null,
          instantPurchasePossibleUntil: null,
          _fk_uuid_highestBiddingBuyerUser: null,
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
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
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    const response = await sut.getRunningAuctions(request);
    assert.strictEqual(response.auctionsAmount, 2);
  });
  it("should provide average number of bids on an auctions", async () => {
    const { sut, httpClient } = makeSut();
    Sinon.stub(httpClient, "get").resolves({
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
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
          numBids: 5,
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
        {
          uuid: "14dd0028-1e41-428e-8f2e-db071a2a6bdc",
          state: 2,
          endingTime: "2022-09-16T15:06:00.000Z",
          remainingTimeInSeconds: 97759,
          remainingTimeForInstantPurchaseInSeconds: null,
          instantPurchasePossibleUntil: null,
          _fk_uuid_highestBiddingBuyerUser: null,
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
          numBids: 1,
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
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    const response = await sut.getRunningAuctions(request);
    assert.strictEqual(response.avegareBidsPerAuction, 3);
  });
  it("Should return average bids 0 if there is no bids for a auction", async () => {
    const { sut, httpClient } = makeSut();
    Sinon.stub(httpClient, "get").resolves({
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
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
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
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    const response = await sut.getRunningAuctions(request);
    assert.strictEqual(response.avegareBidsPerAuction, 0);
  });
  it("Should round number of bids in an auction", async () => {
    const { sut, httpClient } = makeSut();
    Sinon.stub(httpClient, "get").resolves({
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
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
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
        {
          uuid: "14dd0028-1e41-428e-8f2e-db071a2a6bdc",
          state: 2,
          endingTime: "2022-09-16T15:06:00.000Z",
          remainingTimeInSeconds: 97759,
          remainingTimeForInstantPurchaseInSeconds: null,
          instantPurchasePossibleUntil: null,
          _fk_uuid_highestBiddingBuyerUser: null,
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: 14439,
          minimumRequiredAskNet: 12133.6134453782,
          numBids: 3,
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
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    const response = await sut.getRunningAuctions(request);
    assert.strictEqual(response.avegareBidsPerAuction, 2);
  });
  it("Should return null if the minimum required is null", async () => {
    const { sut, httpClient } = makeSut();
    Sinon.stub(httpClient, "get").resolves({
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
          currentHighestBidValue: 95,
          currentHighestBidValueNet: 0,
          minimumRequiredAsk: null,
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
    const userId = "teste2@gmail.com";
    const request: HTTPRequest<User> = {
      endpoint: `api/v1/auction/salesman/${userId}/_all/bidding-data`,
      headers: {
        accept: "application/json",
        authtoken: "token",
        userid: userId,
      },
    };
    const response = await sut.getRunningAuctions(request);
    assert.strictEqual(response.auctions[0].auctionRatioProgress, null);
  });
});
