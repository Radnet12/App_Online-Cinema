import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getLocalStorageValue } from "@/helpers";

import { getNewTokens, login, logout, register } from "./User.thunks";
import * as UserThunks from "./User.thunks";
import { IInitialState } from "./User.types";

const initialState: IInitialState = {
  user: getLocalStorageValue("user"),
  isLoading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.isLoading = false;
        }
      )
      .addCase(register.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getNewTokens.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const UserActions = {
  ...UserSlice.actions,
  ...UserThunks,
};
export const UserReducer = UserSlice.reducer;
