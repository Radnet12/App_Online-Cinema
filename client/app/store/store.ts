import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { UserReducer } from "./reducers/User/User.reducer";

const reducers = combineReducers({
  user: UserReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export type TypeRootState = ReturnType<typeof store.getState>;
