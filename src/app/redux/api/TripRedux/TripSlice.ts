import { createSlice } from "@reduxjs/toolkit";

type TProductState = {
  filtered: string;
  param: string;
};

const initialState: TProductState = {
  filtered: "",
  param: "",
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filtered, param } = action.payload;
      state.param = param;
      if (param) {
        state.filtered = filtered;
      } else {
        state.filtered = "";
      }
    },
    clearFilter: (state) => {
      state.filtered = initialState.filtered;
      state.param = initialState.param;
    },
  },
});

export const { setFilter, clearFilter } = tripSlice.actions;

export default tripSlice.reducer;
