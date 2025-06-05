import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";

type InitialStateType = {
  session: Session | null;
};

const initialState: InitialStateType = {
  session: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setSession(state, action) {
      return { ...state, session: action.payload };
    },
  },
});

// eslint-disable-next-line import/no-unused-modules
export const { setSession } = AuthSlice.actions;

export default AuthSlice.reducer;
