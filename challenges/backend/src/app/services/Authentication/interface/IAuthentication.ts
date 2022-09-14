import { User } from "../entities/User";
import { UserAuthenticationDTO } from "../entities/UserAuthentication";

interface IAuthentication {
  authentication(user: UserAuthenticationDTO): Promise<User>;
}
export { IAuthentication };
