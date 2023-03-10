import { createSlice } from "@reduxjs/toolkit";

const getTheme = () => {
  let darkMode = window.localStorage.getItem("darkMode");
  if (darkMode === null) {
    darkMode = false;
  }
  if (!darkMode) {
    window.localStorage.setItem("darkMode", darkMode);
  }
  return JSON.parse(darkMode);
};

const initialState = {
  darkMode: getTheme() || false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      window.localStorage.setItem("darkMode", state.darkMode);
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
