"use client";

import { useRouter } from "next/navigation";
import type { Job } from "@/app/types";
import Markdown from "markdown-to-jsx";
import styles from "./LatestJobCard.module.css";

type LatestJobCardProps = {
  job: Job;
};

export default function LatestJobCard({ job }: LatestJobCardProps) {
  const router = useRouter();

  return (
    <div
      className={styles.latestJobCard}
      onClick={() => router.push(`/job?reference=${job.reference_number}`)}
    >
      <h3 className={styles.latestJobRoleName}>{job.role_name}</h3>

      <div>
        <p>{job.location}</p>
        <p>
          <strong>{job.salary_range}</strong>
        </p>
      </div>

      <div className={styles.latestJobFooterWrapper}>
        <hr className={styles.latestJobHr} />
        <p className={styles.latestJobDescription}>
          <Markdown>{job.description}</Markdown>
        </p>
      </div>
    </div>
  );
}
