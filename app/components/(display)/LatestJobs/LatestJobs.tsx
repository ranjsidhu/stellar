"use client";

import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks";
import type { Job } from "@/app/types";
import { SectionLoading, LatestJobCard } from "@/app/components";
import styles from "./LatestJobs.module.css";

export default function LatestJobs() {
  const router = useRouter();
  const { isLoading, data: jobs } = useFetch<Job>("/jobs/latest/5");
  return (
    <div className={styles.latestJobsContainerWrapper}>
      <p
        className={styles.latestJobsWrapperTitle}
        onClick={() => router.push("/jobs")}
      >
        Latest Jobs
      </p>
      <SectionLoading loading={isLoading}>
        <div className={styles.latestJobsWrapper}>
          {jobs && jobs.map((job) => <LatestJobCard key={job.id} job={job} />)}
        </div>
      </SectionLoading>
    </div>
  );
}
