interface Auction {
  uuid: string;
  state: number;
  endingTime: string;
  remainingTimeInSeconds: number;
  remainingTimeForInstantPurchaseInSeconds?: any;
  instantPurchasePossibleUntil?: any;
  _fk_uuid_highestBiddingBuyerUser?: any;
  currentHighestBidValue: number;
  currentHighestBidValueNet: number;
  minimumRequiredAsk: number;
  minimumRequiredAskNet: number;
  numBids: number;
  amIHighestBidder: boolean;
  biddingAgentValue?: any;
  isMinAskReached: boolean;
  isCrossBorderNetSale: boolean;
  buyerPurchaseFee: number;
  buyerCrossBorderProcessingAmount: number;
  additionalTaxValue?: any;
  additionalTaxType: number;
  additionalTaxExportDiscount: number;
  // auctionRatioProgress?: string | null;
}

interface NormalizedAuction {
  uuid: string;
  state: number;
  endingTime: string;
  auctionRatioProgress?: string | null;
  currentHighestBidValue: number;
  minimumRequiredAsk: number;
}
export { NormalizedAuction, Auction };
