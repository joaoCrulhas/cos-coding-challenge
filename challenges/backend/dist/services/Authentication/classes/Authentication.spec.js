"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const sinon_1 = __importDefault(require("sinon"));
const AxiosClient_1 = require("../../../utils/HttpClient/classes/AxiosClient");
const Logger_1 = require("../../Logger/classes/Logger");
const Authentication_1 = require("./Authentication");
const makeHttpClientStub = () => {
    const httpClient = new AxiosClient_1.AxiosClientImpl("https://base.com");
    return {
        httpClient,
    };
};
const makeSut = () => {
    const { httpClient } = makeHttpClientStub();
    const logStub = new Logger_1.Logger();
    const sut = new Authentication_1.Authentication(() => httpClient, logStub);
    return {
        httpClient,
        sut,
    };
};
describe("Authentication Service", () => {
    describe("AuthenticationService@authentication", () => {
        it("should call the at least once to call authentication endpoint", () => {
            const { sut, httpClient } = makeSut();
            const spy = sinon_1.default.spy(httpClient, "put");
            sut.authentication({
                email: "userMailTest@gmail.com",
                password: "string",
                meta: "string",
            });
            sinon_1.default.assert.calledOnce(spy);
        });
        it("should call httpClient with correct arguments", async () => {
            const { sut, httpClient } = makeSut();
            const spy = sinon_1.default.stub(httpClient, "put").resolves({
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
            await sut.authentication({
                email: "userMailTest@gmail.com",
                password: "any_string",
                meta: "string",
            });
            sinon_1.default.assert.calledWith(spy, sinon_1.default.match({
                endpoint: "api/v1/authentication/userMailTest@gmail.com",
                body: { password: "any_string", meta: "string" },
            }));
        });
        it("Should return an authenticated user if the request to create a token happened successfully", async () => {
            const { sut, httpClient } = makeSut();
            sinon_1.default.stub(httpClient, "put").resolves({
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
            assert_1.default.deepStrictEqual(response, {
                token: "token",
                authenticated: true,
                userId: "buyer-challenge@caronsale.de",
                internalUserId: 2324,
                internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
                type: "1",
                privileges: "{SALESMAN_USER}",
            });
        });
    });
    beforeEach(() => {
        sinon_1.default.restore();
    });
});
