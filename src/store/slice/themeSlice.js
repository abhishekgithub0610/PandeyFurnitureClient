import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: localStorage.getItem("bs-theme-mango") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("bs-theme-mango", state.theme);
      document.body.setAttribute("data-bs-theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
