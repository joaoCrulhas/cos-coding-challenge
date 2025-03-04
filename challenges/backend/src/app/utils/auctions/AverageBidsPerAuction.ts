import { Auction } from "../../services/CarOnSaleClient/entities";

const averageBidsPerAuction = (auctions: Auction[]): number => {
  if (!auctions.length) {
    return 0;
  }
  return Math.ceil(
    auctions.reduce((pv: number, { numBids }) => {
      return pv + numBids;
    }, 0) / auctions.length
  );
};
export { averageBidsPerAuction };
