import { ITokens } from "./tokens.interface";
import { IUser } from "./user.interface";

export interface IAuthResponse extends ITokens {
  user: IUser;
}
