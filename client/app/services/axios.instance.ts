import axios from "axios";
import Cookies from "js-cookie";

import { checkError, removeTokens } from "@/helpers";

import { AuthService } from "./auth.service";

export const $axios = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const $axiosAuth = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

$axiosAuth.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

$axiosAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        checkError(error) === "jwt expired" ||
        checkError(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;

        await AuthService.getNewTokens();

        return $axiosAuth.request(originalRequest);
      } catch (err) {
        if (checkError(err) === "jwt expired") {
          removeTokens();
        }
      }
    }

    throw error;
  }
);
