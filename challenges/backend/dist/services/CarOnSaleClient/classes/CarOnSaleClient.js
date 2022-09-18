"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarOnSaleClientApi = void 0;
const inversify_1 = require("inversify");
const DependencyIdentifiers_1 = require("../../../DependencyIdentifiers");
const ApiEndpoints_1 = require("../../../utils/ApiEndpoints");
const auctions_1 = require("../../../utils/auctions");
let CarOnSaleClientApi = class CarOnSaleClientApi {
    constructor(httpClientFactory) {
        this._httpClient = httpClientFactory();
    }
    async getRunningAuctions({ userid, authtoken, }) {
        const endpoint = ApiEndpoints_1.API_ENDPOINTS.AUCTION_BIDDING.replace("{customerId}", userid);
        const { data } = await this._httpClient.get({
            endpoint,
            headers: {
                authtoken,
                userid,
            },
        });
        return {
            auctionsAmount: data.length,
            avegareBidsPerAuction: auctions_1.averageBidsPerAuction(data),
            auctions: auctions_1.calculateRatioForEachAuction(data),
        };
    }
};
CarOnSaleClientApi = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.Factories.CarOnSaleHTTP)),
    __metadata("design:paramtypes", [Function])
], CarOnSaleClientApi);
exports.CarOnSaleClientApi = CarOnSaleClientApi;
