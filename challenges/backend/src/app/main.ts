<<<<<<< HEAD
import { Container } from "inversify";
=======
import { Container, interfaces } from "inversify";
>>>>>>> authentication_service
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { Authentication } from "./services/Authentication/classes/Authentication";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { IAuthentication } from "./services/Authentication//interface/IAuthentication";
import { IHTTPClient } from "./utils/HttpClient/interface";
import { AxiosClientImpl } from "./utils/HttpClient/classes/AxiosClient";
<<<<<<< HEAD
=======
import env from "env-var";
require("dotenv").config();

>>>>>>> authentication_service
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
<<<<<<< HEAD

container
  .bind<IHTTPClient>(DependencyIdentifier.HTTPClient)
  .to(AxiosClientImpl);
=======
const baseUrl = env.get("COS_BASE_URL").required(true).asString();

container
  .bind<interfaces.Factory<IHTTPClient>>(
    DependencyIdentifier.Factories.CarOnSaleHTTP
  )
  .toFactory<IHTTPClient>(() => {
    return () => new AxiosClientImpl(baseUrl);
  });

// container
//   .bind<IHTTPClient>(DependencyIdentifier.HTTPClient)
//   .toConstantValue(new AxiosClientImpl(baseUrl))
//   .whenInjectedInto(Authentication);
>>>>>>> authentication_service
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
