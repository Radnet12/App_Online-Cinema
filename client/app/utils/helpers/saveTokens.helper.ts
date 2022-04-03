import Cookies from "js-cookie";

import { IAuthResponse } from "@/types";

export const saveTokens = (data: IAuthResponse) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));
};
