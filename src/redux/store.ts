import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { PreloadedState } from '@reduxjs/toolkit';
import discountReducer from '../features/discountSlice';
const rootReducer = combineReducers({
  discount: discountReducer,

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