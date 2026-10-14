import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("flowboard-user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: Boolean(savedUser),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("flowboard-user", JSON.stringify(action.payload));
    },

    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("flowboard-user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("flowboard-user");
    },

    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      localStorage.setItem("flowboard-user", JSON.stringify(state.user));
    },
  },
});

export const { login, register, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
