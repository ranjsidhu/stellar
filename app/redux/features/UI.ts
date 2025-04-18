import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  loading: boolean;
};

const initialState: InitialStateType = {
  loading: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default UISlice.reducer;
