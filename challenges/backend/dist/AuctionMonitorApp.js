"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionMonitorApp = void 0;
const inversify_1 = require("inversify");
const DependencyIdentifiers_1 = require("./DependencyIdentifiers");
require("reflect-metadata");
const env_var_1 = __importDefault(require("env-var"));
const axios_1 = __importDefault(require("axios"));
let AuctionMonitorApp = class AuctionMonitorApp {
  constructor(logger, authentication, carOnSaleClient, printResult) {
    this.logger = logger;
    this.authentication = authentication;
    this.carOnSaleClient = carOnSaleClient;
    this.printResult = printResult;
  }
  async start() {
    var _a;
    try {
      this.logger.log(`Auction PATINHOS Monitor started.`);
      const email =
        process.env.USEREMAIL ||
        env_var_1.default.get("COS_USEREMAIL").required().asString();
      const password =
        process.env.USERPASSWORD ||
        env_var_1.default.get("COS_USERPASSWORD").required().asString();
      const { userId, token } = await this.authentication.authentication({
        email,
        password,
      });
      const { auctions, auctionsAmount, avegareBidsPerAuction } =
        await this.carOnSaleClient.getRunningAuctions({
          authtoken: token,
          userid: userId,
        });
      await this.printResult.print(JSON.stringify(auctions));
      this.logger.log(`Total Auctions = ${auctionsAmount}`);
      this.logger.log(`Average bids per auction = ${avegareBidsPerAuction}`);
      this.logger.table(auctions);
      process.exit(0);
    } catch (error) {
      let message = "";
      let stack = "";
      if (axios_1.default.isAxiosError(error)) {
        message = `${error.message} ${JSON.stringify(
          (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
        )}`;
        stack = error.message;
      }
      this.logger.error(
        message || error.message,
        stack || stack || error.starck
      );
      process.exit(-1);
    }
  }
};
AuctionMonitorApp = __decorate(
  [
    inversify_1.injectable(),
    __param(
      0,
      inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.LOGGER)
    ),
    __param(
      1,
      inversify_1.inject(
        DependencyIdentifiers_1.DependencyIdentifier.AUTHENTICATION
      )
    ),
    __param(
      2,
      inversify_1.inject(
        DependencyIdentifiers_1.DependencyIdentifier.CarOnSaleClient
      )
    ),
    __param(
      3,
      inversify_1.inject(DependencyIdentifiers_1.DependencyIdentifier.Printer)
    ),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
  ],
  AuctionMonitorApp
);
exports.AuctionMonitorApp = AuctionMonitorApp;
