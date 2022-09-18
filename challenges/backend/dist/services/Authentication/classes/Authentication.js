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
exports.Authentication = void 0;
const ApiEndpoints_1 = require("../../../utils/ApiEndpoints");
require("reflect-metadata");
const inversify_1 = require("inversify");
const DependencyIdentifiers_1 = require("../../../DependencyIdentifiers");
let Authentication = class Authentication {
    constructor(httpClientFactory, logger) {
        this._httpClient = httpClientFactory();
        this._logger = logger;
    }
    async authentication(user) {
        this._logger.debug(`Creating a token for user ${user.email}`, `request ${JSON.stringify(user)}`);
        const authenticationRequest = {
            endpoint: `${ApiEndpoints_1.API_ENDPOINTS.TOKEN_GENERATOR}/${user.email}`,
            body: {
                password: user.password,
                meta: "string",
            },
        };
        const { data } = await this._httpClient.put(authenticationRequest);
        return data;
    }
};
Authentication = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.Factories.CarOnSaleHTTP)),
    __param(1, inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.LOGGER)),
    __metadata("design:paramtypes", [Function, Object])
], Authentication);
exports.Authentication = Authentication;
