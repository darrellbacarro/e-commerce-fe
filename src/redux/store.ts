import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { PreloadedState } from '@reduxjs/toolkit';
import productSlice from "./slices/productSlice";

const rootReducer = combineReducers({
  products: productSlice
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];