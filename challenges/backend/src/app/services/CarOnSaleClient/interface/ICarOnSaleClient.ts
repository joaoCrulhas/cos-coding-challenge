import { NormalizedAuction } from "../entities";
export interface RunningAuction {
  auctionsAmount: number;
  avegareBidsPerAuction: number;
  auctions: NormalizedAuction[];
}
/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */

export interface RunningAuctionsDTO {
  authtoken: string;
  userid: string;
}
export interface ICarOnSaleClient {
  getRunningAuctions(request: RunningAuctionsDTO): Promise<RunningAuction>;
}
