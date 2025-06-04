import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";
import { removeItem } from "@/app/utils/storage";

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
    clearSession(state) {
      removeItem("userDetails");
      state.session = null;
    },
  },
});

// eslint-disable-next-line import/no-unused-modules
export const { clearSession, setSession } = AuthSlice.actions;

export default AuthSlice.reducer;
