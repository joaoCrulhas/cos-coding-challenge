import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import {
  averageBidsPerAuction,
  calculateRatioForEachAuction,
} from "../../../utils/auctions";
import { HTTPRequest, IHTTPClient } from "../../../utils/HttpClient/interface";
import { User } from "../../Authentication/entities";
import { Auction } from "../entities";
import {
  ICarOnSaleClient,
  RunningAuction,
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

  async getRunningAuctions(
    request: HTTPRequest<User>
  ): Promise<RunningAuction> {
    const { data } = await this._httpClient.get<Auction[]>(request);
    return {
      auctionsAmount: data.length,
      avegareBidsPerAuction: averageBidsPerAuction(data),
      auctions: calculateRatioForEachAuction(data),
    };
  }
}

export { CarOnSaleClientApi };
