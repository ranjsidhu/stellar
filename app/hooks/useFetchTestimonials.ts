import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setTestimonials } from "@/lib/features/Testimonials";
import { setLoading } from "@/lib/features/UI";
import instance from "@/app/utils/instance";

export const useFetchTestimonials = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchTestimonials = async () => {
      try {
        const {
          data: { data: testimonials },
        } = await instance.get("/testimonials");
        dispatch(setTestimonials(testimonials));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };

    fetchTestimonials();
  }, [dispatch]);
};
