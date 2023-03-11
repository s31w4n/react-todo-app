import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: JSON.parse(window.localStorage.getItem("darkMode")) || false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = !state.darkMode;
      window.localStorage.setItem("darkMode", newMode);
      state.darkMode = newMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
