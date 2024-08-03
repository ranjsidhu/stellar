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
      state.authenticated = action.payload;
    },
    setUserDetails(state, action) {
      state.user = action.payload;
    },
    clearSession(state, action) {
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
      localStorage.removeItem("user");
    },
  },
});

export const { setAuthenticated, setUserDetails, clearSession } =
  AuthSlice.actions;

export default AuthSlice.reducer;
