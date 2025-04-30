import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    fromCountry: "",
    type: "",
    difficulty: "",
  },
  reducers: {
    setFromCountry: (state, action) => {
      state.fromCountry = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    resetFilters: (state) => {
      state.fromCountry = "";
      state.type = "";
      state.difficulty = "";
    },
  },
});

export const { setFromCountry, setType, setDifficulty, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
