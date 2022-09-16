import { Auction } from "../../services/CarOnSaleClient/entities";

const calculateRatioForEachAuction = (auctions: Auction[]): Auction[] => {
  return auctions.map((auction) => {
    const auctionRatioProgress =
      !auction.currentHighestBidValue || !auction.minimumRequiredAsk
        ? null
        : auction.currentHighestBidValue / auction.minimumRequiredAsk;
    return {
      ...auction,
      auctionRatioProgress,
    };
  });
};
export { calculateRatioForEachAuction };
