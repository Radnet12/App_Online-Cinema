import Cookies from "js-cookie";

export const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("user");
};
