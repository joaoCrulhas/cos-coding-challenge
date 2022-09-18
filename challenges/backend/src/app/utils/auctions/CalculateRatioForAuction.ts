import {
  Auction,
  NormalizedAuction,
} from "../../services/CarOnSaleClient/entities";

const formatNumber = ({
  currentHighestBidValue,
  minimumRequiredAsk,
}: Auction): string => {
  return ((currentHighestBidValue / minimumRequiredAsk) * 100).toFixed(2) + "%";
};

const calculateRatioForEachAuction = (
  auctions: Auction[]
): NormalizedAuction[] => {
  return auctions.map((auction) => {
    const auctionRatioProgress =
      !auction.currentHighestBidValue || !auction.minimumRequiredAsk
        ? null
        : formatNumber(auction);
    return {
      uuid: auction.uuid,
      state: auction.state,
      endingTime: auction.endingTime,
      auctionRatioProgress,
      currentHighestBidValue: auction.currentHighestBidValue,
      minimumRequiredAsk: auction.minimumRequiredAsk,
    };
  });
};
export { calculateRatioForEachAuction };
