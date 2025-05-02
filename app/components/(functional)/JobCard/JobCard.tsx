"use client";

import { useRouter } from "next/navigation";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { JobProps } from "@/app/types";
import { calculateHours } from "@/app/utils";
import Markdown from "markdown-to-jsx";
import styles from "./JobCard.module.css";

export default function JobCard({ job }: Readonly<JobProps>) {
  const router = useRouter();

  return (
    <button
      className="flex flex-col gap-1 text-left p-7.5 rounded-lg"
      onClick={(e) => {
        e.preventDefault();
        if (window.location.href.includes("/admin/jobs")) {
          router.push(`/admin/jobs/${job.reference_number}`);
          return;
        }
        router.push(`/job?reference=${job.reference_number}`);
      }}
    >
      <h3 className={styles.jobRoleName}>{job.role_name}</h3>
      <p className={styles.jobCardPosted}>{calculateHours(job.created_at)}</p>

      <p>
        <DrawingPinIcon className={styles.jobLocationIcon} /> {job.location} |
        {"  "}
        <strong>{job.salary_range}</strong>
      </p>

      <div className={styles.jobFooterWrapper}>
        <p className={styles.jobDescription}>
          <Markdown>{job.description}</Markdown>
        </p>
      </div>
    </button>
  );
}
