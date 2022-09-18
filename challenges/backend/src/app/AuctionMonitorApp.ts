import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { IAuthentication } from "./services/Authentication/interface/IAuthentication";
import env from "env-var";
import axios from "axios";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IPrint } from "./services/printer/interface/IPrint";
@injectable()
export class AuctionMonitorApp {
  constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.AUTHENTICATION)
    private authentication: IAuthentication,
    @inject(DependencyIdentifier.CarOnSaleClient)
    private carOnSaleClient: ICarOnSaleClient,
    @inject(DependencyIdentifier.Printer)
    private printResult: IPrint
  ) {}

  public async start(): Promise<void> {
    try {
      this.logger.log(`Auction Monitor started.`);
      const email =
        process.env.USEREMAIL || env.get("COS_USEREMAIL").required().asString();
      const password =
        process.env.USERPASSWORD ||
        env.get("COS_USERPASSWORD").required().asString();
      const { userId, token } = await this.authentication.authentication({
        email,
        password,
      });
      const { auctions, auctionsAmount, avegareBidsPerAuction } =
        await this.carOnSaleClient.getRunningAuctions({
          authtoken: token,
          userid: userId,
        });
      await this.printResult.print(JSON.stringify(auctions));
      this.logger.log(`Total Auctions = ${auctionsAmount}`);
      this.logger.log(`Average bids per auction = ${avegareBidsPerAuction}`);
      this.logger.table(auctions);
      process.exit(0);
    } catch (error: any) {
      let message = "";
      let stack = "";
      if (axios.isAxiosError(error)) {
        message = `${error.message} ${JSON.stringify(error.response?.data)}`;
        stack = error.message;
      }
      this.logger.error(
        message || error.message,
        stack || stack || error.starck
      );
      process.exit(-1);
    }
  }
}
