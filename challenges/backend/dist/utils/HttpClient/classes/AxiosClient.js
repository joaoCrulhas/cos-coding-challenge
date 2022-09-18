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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosClientImpl = void 0;
const axios_1 = __importDefault(require("axios"));
const inversify_1 = require("inversify");
require("reflect-metadata");
let AxiosClientImpl = class AxiosClientImpl {
    constructor(baseURL) {
        this.axios = axios_1.default.create({
            baseURL,
            timeout: 5000,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    }
    async get({ endpoint, headers, }) {
        const { data, status } = await this.axios.get(endpoint, {
            headers: {
                authtoken: (headers === null || headers === void 0 ? void 0 : headers.authtoken) || "",
                userid: (headers === null || headers === void 0 ? void 0 : headers.userid) || "",
            },
        });
        return {
            statusCode: status,
            data,
        };
    }
    async put({ body, endpoint, headers, }) {
        const { data, status } = await this.axios.put(endpoint, body, {
            headers: {
                authtoken: (headers === null || headers === void 0 ? void 0 : headers.authtoken) || "",
                userid: (headers === null || headers === void 0 ? void 0 : headers.userid) || "",
            },
        });
        return {
            statusCode: status,
            data,
        };
    }
};
AxiosClientImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String])
], AxiosClientImpl);
exports.AxiosClientImpl = AxiosClientImpl;
