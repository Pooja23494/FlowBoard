import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarCollapsed: false,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },

    openMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },

    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },

    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;
