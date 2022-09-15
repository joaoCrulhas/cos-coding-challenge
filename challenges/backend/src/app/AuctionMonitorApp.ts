import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { IAuthentication } from "./services/Authentication/interface/IAuthentication";
import env from "env-var";
import axios, { AxiosError } from "axios";
@injectable()
export class AuctionMonitorApp {
<<<<<<< HEAD
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger
  ) {}

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);
    // TODO: Retrieve auctions and display aggregated information (see README.md)
=======
  private _authentication: IAuthentication;
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.AUTHENTICATION) authentication: IAuthentication
  ) {
    this._authentication = authentication;
  }

  public async start(): Promise<void> {
    try {
      this.logger.log(`Auction Monitor started.`);
      const email = env.get("COS_USEREMAIL").required().asString();
      const password = env.get("COS_USERPASSWORD").required().asString();
      const { userId, authenticated } =
        await this._authentication.authentication({
          email,
          password,
        });
      this.logger.log(
        `The user ${userId} authentication status is ${
          authenticated ? "authenticated" : "not authenticated"
        }`
      );
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        this.logger.log(
          `[ERROR] An Error happen during the script ${
            error.response?.status
          }, ${JSON.stringify(error.response?.data)}`
        );
      }
    }
>>>>>>> authentication_service
  }
}
