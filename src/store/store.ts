import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./Slices/CounterSlice";
import LocationSlice from "./Slices/locationSlice";
export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    location: LocationSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
