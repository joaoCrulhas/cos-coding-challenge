import { Auction } from "../../services/CarOnSaleClient/entities";

const calculateRatioForEachAuction = (auctions: Auction[]): Auction[] => {
  return auctions.map((auction) => {
    return {
      ...auction,
      auctionRatioProgress:
        auction.currentHighestBidValue / auction.minimumRequiredAsk,
    };
  });
};
export { calculateRatioForEachAuction };
