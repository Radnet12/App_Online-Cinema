import Cookies from "js-cookie";

import { IAuthResponse, IUser } from "@/types";

import { $api } from "./axios.instance";

export class AuthService {
  static async register(user: Pick<IUser, "email" | "password">) {
    return $api.post<IAuthResponse>("/auth/register", user);
  }

  static async login(user: Pick<IUser, "email" | "password">) {
    return $api.post<IAuthResponse>("/auth/login", user);
  }

  static async getNewTokens() {
    return $api.post<IAuthResponse>(
      "/auth/refresh",
      {
        refreshToken: Cookies.get("refreshToken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
