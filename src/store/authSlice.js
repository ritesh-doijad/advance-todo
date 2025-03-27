import { createSlice } from "@reduxjs/toolkit";

// Load authentication state from localStorage
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  username: localStorage.getItem("username") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", action.payload.username);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
