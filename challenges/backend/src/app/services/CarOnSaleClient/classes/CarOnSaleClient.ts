import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { API_ENDPOINTS } from "../../../utils/ApiEndpoints";
import {
  averageBidsPerAuction,
  calculateRatioForEachAuction,
} from "../../../utils/auctions";
import { IHTTPClient } from "../../../utils/HttpClient/interface";
import { Auction } from "../entities";
import {
  ICarOnSaleClient,
  RunningAuction,
  RunningAuctionsDTO,
} from "../interface/ICarOnSaleClient";

@injectable()
class CarOnSaleClientApi implements ICarOnSaleClient {
  private _httpClient: IHTTPClient;
  constructor(
    @inject(DependencyIdentifier.Factories.CarOnSaleHTTP)
    httpClientFactory: () => IHTTPClient
  ) {
    this._httpClient = httpClientFactory();
  }

  async getRunningAuctions({
    userid,
    authtoken,
  }: RunningAuctionsDTO): Promise<RunningAuction> {
    const endpoint = API_ENDPOINTS.AUCTION_BIDDING.replace(
      "{customerId}",
      userid
    );
    const { data } = await this._httpClient.get<Auction[]>({
      endpoint,
      headers: {
        accept: "application/json",
        authtoken,
        userid,
      },
    });
    return {
      auctionsAmount: data.length,
      avegareBidsPerAuction: averageBidsPerAuction(data),
      auctions: calculateRatioForEachAuction(data),
    };
  }
}

export { CarOnSaleClientApi };
