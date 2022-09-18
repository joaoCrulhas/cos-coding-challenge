"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyIdentifier = void 0;
exports.DependencyIdentifier = {
    LOGGER: "logger",
    AUTHENTICATION: "authentication",
    HTTPClient: "axiosClient",
    CarOnSaleClient: "carOnSaleClient",
    Printer: "Printer",
    Factories: {
        CarOnSaleHTTP: "Factory<HTTPClient>",
    },
};
