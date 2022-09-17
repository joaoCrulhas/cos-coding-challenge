import { Auction } from "../../services/CarOnSaleClient/entities";

const formatNumber = ({
  currentHighestBidValue,
  minimumRequiredAsk,
}: Auction): string => {
  return ((currentHighestBidValue / minimumRequiredAsk) * 100).toFixed(2) + "%";
};

const calculateRatioForEachAuction = (auctions: Auction[]): Auction[] => {
  return auctions.map((auction) => {
    const auctionRatioProgress =
      !auction.currentHighestBidValue || !auction.minimumRequiredAsk
        ? null
        : formatNumber(auction);
    return {
      ...auction,
      auctionRatioProgress,
    };
  });
};
export { calculateRatioForEachAuction };
