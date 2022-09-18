"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiEndpoints_1 = require("../../ApiEndpoints");
const AxiosClient_1 = require("./AxiosClient");
const env_var_1 = __importDefault(require("env-var"));
const nock_1 = __importDefault(require("nock"));
const assert_1 = __importDefault(require("assert"));
const makeSut = () => {
    const baseURL = env_var_1.default.get("COS_BASE_URL").required(true).asString();
    const sut = new AxiosClient_1.AxiosClientImpl(baseURL);
    return {
        sut,
    };
};
describe("Testing the AxiosClientIntegration", () => {
    beforeEach(() => {
        process.env.COS_BASE_URL = "https://api-core-dev.caronsale.de";
    });
    it("Should return a user if the server response return an user", async () => {
        const endpoint = `/${ApiEndpoints_1.API_ENDPOINTS.TOKEN_GENERATOR}/teste%40gmail.com`;
        nock_1.default("https://api-core-dev.caronsale.de", {
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
        const createTokenRequest = {
            endpoint,
            body: {
                password: "any_password",
                meta: "string",
            },
        };
        const response = await sut.put(createTokenRequest);
        assert_1.default.deepStrictEqual(response, {
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
        const endpoint = ApiEndpoints_1.API_ENDPOINTS.AUCTION_BIDDING.replace("{customerId}", "test@gmail.com");
        nock_1.default("https://api-core-dev.caronsale.de", {
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
        const request = {
            endpoint,
            headers: {
                authtoken: "token",
                userid: "test@gmail.com",
            },
        };
        const response = await sut.get(request);
        assert_1.default.deepStrictEqual(response, {
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
    it("Should call with empty userId and authToken for publics endpoints", async () => {
        const { sut } = makeSut();
        const endpoint = "/api/v1/authentication/buyer-challenge%40caronsale.de/registered";
        nock_1.default("https://api-core-dev.caronsale.de", {
            encodedQueryParams: true,
        })
            .get(endpoint)
            .reply(204);
        const response = await sut.get({
            endpoint,
        });
        assert_1.default.strictEqual(response.statusCode, 204);
    });
    it("Should call with empty userId and authToken for publics endpoints", async () => {
        const { sut } = makeSut();
        const endpoint = "/api/v1/authentication/buyer-challenge%40caronsale.de/registered";
        nock_1.default("https://api-core-dev.caronsale.de", {
            encodedQueryParams: true,
        })
            .get(endpoint)
            .reply(204);
        const response = await sut.get({
            endpoint,
        });
        assert_1.default.strictEqual(response.statusCode, 204);
    });
    it("Should add the auth headers when a protected route is called", async () => {
        const { sut } = makeSut();
        const endpoint = "/api/v1/auction/salesman/buyer-challenge%40caronsale.de/14dd0028-1e41-428e-8f2e-db071a2a6bdc";
        nock_1.default("https://api-core-dev.caronsale.de", {
            encodedQueryParams: true,
        })
            .put(endpoint)
            .reply(201, {
            value: 0,
            valueNet: 0,
            isHotBid: true,
            isAutoBid: true,
            clientCategory: 0,
            _fk_uuid_auction: "string",
            _fk_uuid_biddingBuyer: "string",
            _fk_uuid_triggeringBuyer: "string",
            id: 0,
            createdAt: "2022-09-17T18:12:46.749Z",
            updatedAt: "2022-09-17T18:12:46.749Z",
            deletedAt: "2022-09-17T18:12:46.749Z",
            uuid: "string",
        });
        const response = await sut.put({
            endpoint,
            headers: {
                authtoken: "token",
                userid: "buyer-challenge%40caronsale.de",
            },
        });
        assert_1.default.strictEqual(response.statusCode, 201);
        assert_1.default.deepStrictEqual(response.data, {
            value: 0,
            valueNet: 0,
            isHotBid: true,
            isAutoBid: true,
            clientCategory: 0,
            _fk_uuid_auction: "string",
            _fk_uuid_biddingBuyer: "string",
            _fk_uuid_triggeringBuyer: "string",
            id: 0,
            createdAt: "2022-09-17T18:12:46.749Z",
            updatedAt: "2022-09-17T18:12:46.749Z",
            deletedAt: "2022-09-17T18:12:46.749Z",
            uuid: "string",
        });
    });
});
