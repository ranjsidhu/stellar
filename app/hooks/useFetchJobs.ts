import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setJobs } from "@/lib/features/Jobs";
import instance from "@/app/utils/instance";

export const useFetchJobs = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      const {
        data: { data: jobs },
      } = await instance.get("/api/stellar/jobs");
      dispatch(setJobs(jobs));
    };

    fetchJobs();
  }, [dispatch]);
};
