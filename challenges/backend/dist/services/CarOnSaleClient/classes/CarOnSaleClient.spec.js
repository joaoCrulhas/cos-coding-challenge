"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const AxiosClient_1 = require("../../../utils/HttpClient/classes/AxiosClient");
const env_var_1 = __importDefault(require("env-var"));
const CarOnSaleClient_1 = require("./CarOnSaleClient");
const assert_1 = __importDefault(require("assert"));
const auctionResponse = [
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
const makeSut = () => {
    const httpClient = new AxiosClient_1.AxiosClientImpl("https://www.baseUrl.com");
    const sut = new CarOnSaleClient_1.CarOnSaleClientApi(() => httpClient);
    return { sut, httpClient };
};
describe("CarOnSaleClientApi", () => {
    before(() => {
        process.env.COS_USEREMAIL = "test@gmail.com";
    });
    it("Should execute the httpClient at least once", async () => {
        const userid = env_var_1.default.get("COS_USEREMAIL").required().asString();
        const { sut, httpClient } = makeSut();
        const spy = sinon_1.default.stub(httpClient, "get").resolves({
            statusCode: 200,
            data: auctionResponse,
        });
        await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        sinon_1.default.assert.calledOnce(spy);
    });
    it("Should execute the httpClient with correct arguments", async () => {
        const { sut, httpClient } = makeSut();
        const spy = sinon_1.default.stub(httpClient, "get").resolves({
            statusCode: 200,
            data: auctionResponse,
        });
        const userid = env_var_1.default.get("COS_USEREMAIL").required().asString();
        await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        sinon_1.default.assert.calledWith(spy, sinon_1.default.match({
            endpoint: `api/v1/auction/salesman/${userid}/_all/bidding-data`,
            headers: {
                authtoken: "authToken",
                userid,
            },
        }));
    });
    it("Should execute with correct arguments if the new user is provided instead a env var user", async () => {
        const { sut, httpClient } = makeSut();
        const spy = sinon_1.default.stub(httpClient, "get").resolves({
            statusCode: 200,
            data: auctionResponse,
        });
        const userid = "teste2@gmail.com";
        await sut.getRunningAuctions({ authtoken: "authToken", userid });
        sinon_1.default.assert.calledWith(spy, {
            endpoint: `api/v1/auction/salesman/${userid}/_all/bidding-data`,
            headers: {
                authtoken: "authToken",
                userid: "teste2@gmail.com",
            },
        });
    });
    it("should call the get method with correct request headers", async () => {
        const { sut, httpClient } = makeSut();
        const spy = sinon_1.default.stub(httpClient, "get").resolves({
            statusCode: 200,
            data: auctionResponse,
        });
        const userid = "test2@gmail.com";
        const request = {
            endpoint: `api/v1/auction/salesman/${userid}/_all/bidding-data`,
            headers: {
                authtoken: "authToken",
                userid,
            },
        };
        await sut.getRunningAuctions({ authtoken: "authToken", userid });
        sinon_1.default.assert.calledWith(spy, request);
    });
    it("Should return a correct the number of auctions if there is 1 auction", async () => {
        const { sut, httpClient } = makeSut();
        sinon_1.default.stub(httpClient, "get").resolves({
            statusCode: 200,
            data: auctionResponse,
        });
        const userid = "teste2@gmail.com";
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.auctionsAmount, 1);
    });
    it("Should return a correct the number of auctions if there is 2 auction", async () => {
        const { sut, httpClient } = makeSut();
        sinon_1.default.stub(httpClient, "get").resolves({
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
        const userid = "teste2@gmail.com";
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.auctionsAmount, 2);
    });
    it("should provide average number of bids on an auctions", async () => {
        const { sut, httpClient } = makeSut();
        sinon_1.default.stub(httpClient, "get").resolves({
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
        const userid = "teste2@gmail.com";
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.avegareBidsPerAuction, 3);
    });
    it("Should return average bids 0 if there is no bids for a auction", async () => {
        const { sut, httpClient } = makeSut();
        sinon_1.default.stub(httpClient, "get").resolves({
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
        const userid = "teste2@gmail.com";
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.avegareBidsPerAuction, 0);
    });
    it("Should round number of bids in an auction", async () => {
        const { sut, httpClient } = makeSut();
        sinon_1.default.stub(httpClient, "get").resolves({
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
        const userid = "teste2@gmail.com";
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.avegareBidsPerAuction, 2);
    });
    it("Should return null if the minimum required is null", async () => {
        const { sut, httpClient } = makeSut();
        sinon_1.default.stub(httpClient, "get").resolves({
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
        const userid = "teste2@gmail.com";
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.auctions[0].auctionRatioProgress, null);
    });
    it("Should return the ratio if the max bid is twice more than min asked", async () => {
        const { sut, httpClient } = makeSut();
        const userid = "teste2@gmail.com";
        sinon_1.default.stub(httpClient, "get").resolves({
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
                    minimumRequiredAsk: 100,
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
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.auctions[0].auctionRatioProgress, "200.00%");
    });
    it("Should return a correct value if the highest bid is half of min asked", async () => {
        const { sut, httpClient } = makeSut();
        const userid = "teste2@gmail.com";
        sinon_1.default.stub(httpClient, "get").resolves({
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
        const response = await sut.getRunningAuctions({
            authtoken: "authToken",
            userid,
        });
        assert_1.default.strictEqual(response.auctions[0].auctionRatioProgress, "50.00%");
    });
});
