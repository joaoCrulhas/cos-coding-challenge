import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { Authentication } from "./services/Authentication/classes/Authentication";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { IAuthentication } from "./services/Authentication//interface/IAuthentication";
import { IHTTPClient } from "./utils/HttpClient/interface";
import { AxiosClientImpl } from "./utils/HttpClient/classes/AxiosClient";
/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);

container
  .bind<IAuthentication>(DependencyIdentifier.AUTHENTICATION)
  .to(Authentication);

container
  .bind<IHTTPClient>(DependencyIdentifier.HTTPClient)
  .to(AxiosClientImpl);
/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
  await app.start();
})();
