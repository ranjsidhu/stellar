import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setJobs } from "@/lib/features/Jobs";

export const useFetchJobs = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await fetch("/api/jobs");
      const jobs = await data.json();
      dispatch(setJobs(jobs));
    };

    fetchJobs();
  }, [dispatch]);
};
