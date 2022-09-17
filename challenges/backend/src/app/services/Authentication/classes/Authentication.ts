import { User } from "../entities/User";
import {
  UserAuthenticationDTO,
  UserAuthentication,
} from "../entities/UserAuthentication";
import { API_ENDPOINTS } from "../../../utils/ApiEndpoints";
import { IAuthentication } from "../interface/IAuthentication";
import { HTTPRequest, IHTTPClient } from "../../../utils/HttpClient/interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";
@injectable()
class Authentication implements IAuthentication {
  private _httpClient: IHTTPClient;
  private _logger: ILogger;
  constructor(
    @inject(DependencyIdentifier.Factories.CarOnSaleHTTP)
    httpClientFactory: () => IHTTPClient,
    @inject(DependencyIdentifier.LOGGER) logger: ILogger
  ) {
    this._httpClient = httpClientFactory();
    this._logger = logger;
  }
  async authentication(user: UserAuthenticationDTO): Promise<User> {
    this._logger.debug(
      `Creating a token for user ${user.email}`,
      `request ${JSON.stringify(user)}`
    );
    const authenticationRequest: HTTPRequest<UserAuthentication> = {
      endpoint: `${API_ENDPOINTS.TOKEN_GENERATOR}/${user.email}`,
      body: {
        password: user.password,
        meta: "string",
      },
    };
    const { data, statusCode } = await this._httpClient.put<
      User,
      UserAuthentication
    >(authenticationRequest);
    this._logger.debug(
      `Response to creating user token for ${user.email}`,
      `${JSON.stringify({ data, statusCode })}`
    );
    return data;
  }
}
export { Authentication };
