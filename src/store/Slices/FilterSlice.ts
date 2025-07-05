import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type FilterState = {
  selectedOptions: string[];
  typeSelectOptions: string[];
  openNowPlaces: boolean;
  hasphnNo: string;
  sort: string;
};
const initialState: FilterState = {
  selectedOptions: [],
  typeSelectOptions: [],
  openNowPlaces: false,
  hasphnNo: "No",
  sort: "",
};
const FilerSlices = createSlice({
  name: "Filter",
  initialState: initialState,
  reducers: {
    setSelectedOptions: (state, action) => {
      const value = action.payload;
      const index = state.selectedOptions.indexOf(value);
      if (index > -1) {
        state.selectedOptions = state.selectedOptions.filter(
          (opt) => opt !== value
        );
      } else {
        state.selectedOptions.push(value);
      }
    },
    settypeSelectedOptions: (state, action) => {
      let value = action.payload;
      let index = state.typeSelectOptions.indexOf(value);
      if (index > -1) {
        state.typeSelectOptions = state.typeSelectOptions.filter(
          (opt) => opt !== value
        );
      } else {
        state.typeSelectOptions.push(value);
      }
    },
    setOpenNowPlaces: (state) => {
      if (state.openNowPlaces) {
        state.openNowPlaces = false;
      } else {
        state.openNowPlaces = true;
      }
    },
    setHasPhoneNumber: (state) => {
      let value = state.hasphnNo;
      state.hasphnNo = value.includes("yes") ? "No" : "yes";
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setOpenNowPlaces,
  setSelectedOptions,
  settypeSelectedOptions,
  setSort,
  setHasPhoneNumber,
} = FilerSlices.actions;
export default FilerSlices.reducer;
