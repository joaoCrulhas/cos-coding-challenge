import * as sut from "./AverageBidsPerAuction";
import assert from "assert";

describe("AverageBidsPerAuction", () => {
  it("Should return 0 if no auction is provided", () => {
    const response = sut.averageBidsPerAuction([]);
    assert.strictEqual(response, 0);
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
    assert.strictEqual(response, 1);
  });
});
