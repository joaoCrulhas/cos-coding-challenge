import { User } from "../entities/User";
<<<<<<< HEAD
import { UserAuthenticationDTO } from "../entities/UserAuthentication";
=======
import {
  UserAuthenticationDTO,
  UserAuthentication,
} from "../entities/UserAuthentication";
>>>>>>> authentication_service
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
<<<<<<< HEAD
    @inject(DependencyIdentifier.HTTPClient) httpClient: IHTTPClient,
    @inject(DependencyIdentifier.LOGGER) logger: ILogger
  ) {
    this._httpClient = httpClient;
    this._logger = logger;
  }
  async authentication(user: UserAuthenticationDTO): Promise<User> {
    this._logger.log(`Creating a token for user ${JSON.stringify(user)}`);
    const authenticationRequest: HTTPRequest<any> = {
=======
    @inject(DependencyIdentifier.Factories.CarOnSaleHTTP)
    httpClientFactory: () => IHTTPClient,
    @inject(DependencyIdentifier.LOGGER) logger: ILogger
  ) {
    this._httpClient = httpClientFactory();
    this._logger = logger;
  }
  async authentication(user: UserAuthenticationDTO): Promise<User> {
    this._logger.log(`Creating a token for user ${user.email}`);
    const authenticationRequest: HTTPRequest<UserAuthentication> = {
>>>>>>> authentication_service
      endpoint: `${API_ENDPOINTS.TOKEN_GENERATOR}/${user.email}`,
      body: {
        password: user.password,
        meta: "string",
      },
    };
<<<<<<< HEAD
    return await this._httpClient.put(authenticationRequest);
=======
    const { data } = await this._httpClient.put<User, UserAuthentication>(
      authenticationRequest
    );
    return data;
>>>>>>> authentication_service
  }
}
export { Authentication };
