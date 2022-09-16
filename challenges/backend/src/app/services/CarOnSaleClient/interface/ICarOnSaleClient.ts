import { HTTPRequest } from "../../../utils/HttpClient/interface";
import { User } from "../../Authentication/entities";
import { Auction } from "../entities";
export interface RunningAuction {
  auctionsAmount: number;
  avegareBidsPerAuction: number;
  auctions: Auction[];
}
/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
  getRunningAuctions(request: HTTPRequest<User>): Promise<RunningAuction>;
}
