import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
  isAuthenticated: false,
  //change 25 feb
  isLoading: false, // Start as true to prevent UI flickering
  //isLoading: true, // Start as true to prevent UI flickering
  //change 25 feb ends
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Inside authSlice.js reducers:
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false; // ✅ Important
    },

    // Useful for background refreshes
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isLoading = false; // ✅ Important
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuth, logout, setAuthLoading, setAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
