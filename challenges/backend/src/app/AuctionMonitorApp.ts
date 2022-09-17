import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { IAuthentication } from "./services/Authentication/interface/IAuthentication";
import env from "env-var";
import axios from "axios";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
@injectable()
export class AuctionMonitorApp {
  constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.AUTHENTICATION)
    private authentication: IAuthentication,
    @inject(DependencyIdentifier.CarOnSaleClient)
    private carOnSaleClient: ICarOnSaleClient
  ) {}

  public async start(): Promise<void> {
    try {
      this.logger.log(`Auction Monitor started.`);
      const email = env.get("COS_USEREMAIL").required().asString();
      const password = env.get("COS_USERPASSWORD").required().asString();
      const { userId, authenticated, token } =
        await this.authentication.authentication({
          email,
          password,
        });
      this.logger.log(
        `The user ${userId} authentication status is ${
          authenticated ? "authenticated" : "not authenticated"
        }`
      );
      const auctions = await this.carOnSaleClient.getRunningAuctions({
        authtoken: token,
        userid: userId,
      });
      this.logger.log(JSON.stringify(auctions));
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
