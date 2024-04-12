import { createSlice } from "@reduxjs/toolkit";

type Testimonial = {
  id: number;
  testimonial: string;
  poster: string;
  created_at: string;
};

type InitialStateType = {
  testimonials: Testimonial[];
};

const initialState: InitialStateType = {
  testimonials: [],
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setTestimonials(state, action) {
      state.testimonials = action.payload;
    },
  },
});

export const { setTestimonials } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
