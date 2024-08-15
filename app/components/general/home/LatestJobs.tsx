"use client";

import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks";
import { Job } from "@/app/types";
import { SectionLoading } from "@/app/components";
import LatestJobCard from "./LatestJobCard";
import "./latest-jobs.css";

export default function LatestJobs() {
  const router = useRouter();
  const { isLoading, data: jobs } = useFetch<Job>("/jobs/latest/5");

  return (
    <div className="latest-jobs-container-wrapper">
      <p
        className="latest-jobs-wrapper-title"
        onClick={() => router.push("/jobs")}
      >
        Latest jobs
      </p>
      <SectionLoading loading={isLoading}>
        <div className="latest-jobs-wrapper">
          {jobs && jobs.map((job) => <LatestJobCard key={job.id} job={job} />)}
        </div>
      </SectionLoading>
    </div>
  );
}
