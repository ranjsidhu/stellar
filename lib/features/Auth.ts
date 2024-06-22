import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  authenticated: boolean;
  // TODO - define user type for state
  user: any;
};

const initialState: InitialStateType = {
  authenticated: false,
  user: {},
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.authenticated = action.payload;
    },
    setUserDetails(state, action) {
      state.user = action.payload;
    },
    clearSession(state, action) {
      state.authenticated = false;
      state.user = {};
    },
  },
});

export const { setAuthenticated, setUserDetails, clearSession } =
  AuthSlice.actions;

export default AuthSlice.reducer;
