"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Logger_1 = require("./services/Logger/classes/Logger");
const Authentication_1 = require("./services/Authentication/classes/Authentication");
const DependencyIdentifiers_1 = require("./DependencyIdentifiers");
const AuctionMonitorApp_1 = require("./AuctionMonitorApp");
const AxiosClient_1 = require("./utils/HttpClient/classes/AxiosClient");
const env_var_1 = __importDefault(require("env-var"));
const CarOnSaleClient_1 = require("./services/CarOnSaleClient/classes/CarOnSaleClient");
const PrintInFile_1 = require("./services/printer/classes/PrintInFile");
require("dotenv").config();
/*
 * Create the DI container.
 */
const container = new inversify_1.Container({
    defaultScope: "Singleton",
});
/*
 * Register dependencies in DI environment.
 */
container.bind(DependencyIdentifiers_1.DependencyIdentifier.LOGGER).to(Logger_1.Logger);
container.bind(DependencyIdentifiers_1.DependencyIdentifier.Printer).to(PrintInFile_1.PrintFile);
container
    .bind(DependencyIdentifiers_1.DependencyIdentifier.CarOnSaleClient)
    .to(CarOnSaleClient_1.CarOnSaleClientApi);
container
    .bind(DependencyIdentifiers_1.DependencyIdentifier.AUTHENTICATION)
    .to(Authentication_1.Authentication);
const baseUrl = env_var_1.default.get("COS_BASE_URL").required(true).asString();
container
    .bind(DependencyIdentifiers_1.DependencyIdentifier.Factories.CarOnSaleHTTP)
    .toFactory(() => {
    return () => new AxiosClient_1.AxiosClientImpl(baseUrl);
});
/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp_1.AuctionMonitorApp);
/*
 * Start the application
 */
(async () => {
    await app.start();
})();
