import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isMobileMenuOpen: boolean;
  isOverlayVisible: boolean;
  loading: boolean;
};

const initialState: InitialStateType = {
  isMobileMenuOpen: false,
  isOverlayVisible: false,
  loading: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleMobileMenu(state, action) {
      const { visible } = action.payload;
      state.isMobileMenuOpen = visible;
      state.isOverlayVisible = visible;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { toggleMobileMenu, setLoading } = UISlice.actions;

export default UISlice.reducer;
