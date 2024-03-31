import { createSlice } from "@reduxjs/toolkit";

type Job = {
  id: number;
  role_name: string;
  location: string;
  salary_range: string;
  reference_number: string;
  description: string;
  created_at: string;
};

type InitialStateType = {
  jobs: Job[];
};

const initialState: InitialStateType = {
  jobs: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
  },
});

export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
