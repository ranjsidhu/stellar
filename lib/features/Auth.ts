import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  authenticated: boolean;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    dob: Date | string;
    email: string;
    phone: null | string;
    first_line_address: string;
    town: string;
    city: string | null;
    postcode: string;
    role_id: number;
    last_logged_in: Date | string | null;
    created_at: Date | string;
    updated_at: Date | string;
    is_deleted: boolean | null;
    deleted_at: Date | string | null;
  };
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
    },
  },
});

export const { setAuthenticated, setUserDetails, clearSession } =
  AuthSlice.actions;

export default AuthSlice.reducer;
