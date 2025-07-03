import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  granted: boolean;
  denied: boolean;
  checked: boolean;
};

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  granted: false,
  denied: false,
  checked: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.granted = true;
      state.denied = false;
      state.checked = true;
    },
    setLocationStatus: (
      state,
      action: PayloadAction<{
        granted: boolean;
        denied: boolean;
        checked: boolean;
      }>
    ) => {
      state.granted = action.payload.granted;
      state.denied = action.payload.denied;
      state.checked = action.payload.checked;
    },
  },
});

export const { setLocation, setLocationStatus } = locationSlice.actions;
export default locationSlice.reducer;
