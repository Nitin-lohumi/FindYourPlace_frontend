import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./Slices/CounterSlice";
import LocationSlice from "./Slices/locationSlice";
import FilterSlices from "./Slices/FilterSlice";
import tokenReducer from "./Slices/tokenSlice";
export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    location: LocationSlice,
    Filters: FilterSlices,
    token: tokenReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
