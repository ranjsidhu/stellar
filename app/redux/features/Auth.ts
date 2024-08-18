import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/app/types";

type InitialStateType = {
  authenticated: boolean;
  user: User;
};

const initialState: InitialStateType = {
  authenticated: false,
  user: {
    id: -1,
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
    first_line_address: "",
    town: "",
    city: "",
    postcode: "",
    role_id: -1,
    last_logged_in: "",
    created_at: "",
    updated_at: "",
    is_deleted: false,
    deleted_at: "",
  },
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      return { ...state, authenticated: action.payload };
    },
    setUserDetails(state, action) {
      return { ...state, user: action.payload };
    },
    clearSession(state) {
      state.authenticated = false;
      state.user = {
        id: -1,
        first_name: "",
        last_name: "",
        dob: "",
        email: "",
        phone: "",
        first_line_address: "",
        town: "",
        city: "",
        postcode: "",
        role_id: -1,
        last_logged_in: "",
        created_at: "",
        updated_at: "",
        is_deleted: false,
        deleted_at: "",
      };
    },
  },
});

export const { setAuthenticated, clearSession, setUserDetails } =
  AuthSlice.actions;

export default AuthSlice.reducer;
