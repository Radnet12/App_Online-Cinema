import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { AuthService } from "@/services";

import { IAuthResponse, IUser } from "@/types";

import { checkError, removeTokens, saveTokens, showError } from "@/helpers";

/* Register */
export const register = createAsyncThunk<
  IAuthResponse,
  Pick<IUser, "email" | "password">
>("user/register", async (user, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(user);

    if (response.data.accessToken) {
      saveTokens(response.data);
    }

    toast.success("You have been successfully registrated!");

    return response.data;
  } catch (err) {
    showError(err);
    return rejectWithValue(err);
  }
});

/* Login */
export const login = createAsyncThunk<
  IAuthResponse,
  Pick<IUser, "email" | "password">
>("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(user);

    if (response.data.accessToken) {
      saveTokens(response.data);
    }

    toast.success("You have been successfully logged in!");

    return response.data;
  } catch (err) {
    showError(err);
    return rejectWithValue(err);
  }
});

/* Logout */
export const logout = createAsyncThunk("user/logout", async () => {
  removeTokens();
});

/* Check auth */
export const getNewTokens = createAsyncThunk(
  "user/getNewTokens",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.getNewTokens();

      if (response.data.accessToken) {
        saveTokens(response.data);
      }

      return response.data;
    } catch (err) {
      if (checkError(err) === "jwt expired") {
        toast.error("Your authorization is finished, sign in again!");
        dispatch(logout());
      }

      return rejectWithValue(err);
    }
  }
);
