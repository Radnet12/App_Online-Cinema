import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export type TypeRootState = ReturnType<typeof store.getState>;
