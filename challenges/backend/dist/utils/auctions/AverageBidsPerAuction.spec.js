"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sut = __importStar(require("./AverageBidsPerAuction"));
const assert_1 = __importDefault(require("assert"));
describe("AverageBidsPerAuction", () => {
    it("Should return 0 if no auction is provided", () => {
        const response = sut.averageBidsPerAuction([]);
        assert_1.default.strictEqual(response, 0);
    });
    it("Should return a correct average bid per auction if more than one auction is provided", () => {
        const response = sut.averageBidsPerAuction([
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
                minimumRequiredAskNet: 200,
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
                currentHighestBidValue: 200,
                currentHighestBidValueNet: 0,
                minimumRequiredAsk: 400,
                minimumRequiredAskNet: 200,
                numBids: 2,
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
        assert_1.default.strictEqual(response, 1);
    });
});
