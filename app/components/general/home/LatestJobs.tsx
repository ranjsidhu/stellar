"use client";

import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks";
import { Job } from "@/app/types";
import { SectionLoading } from "@/app/components";
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
          {jobs &&
            jobs.map((job) => (
              <div
                key={job.id}
                className="latest-job-card"
                onClick={() => {
                  router.push(`/job?reference=${job.reference_number}`);
                }}
              >
                <h3 className="latest-job-role-name">{job.role_name}</h3>

                <div className="latest-job-mid-wrapper">
                  <p className="latest-job-location">{job.location}</p>
                  <p className="latest-job-salary">
                    <strong>{job.salary_range}</strong>
                  </p>
                </div>

                <div className="latest-job-footer-wrapper">
                  <hr className="latest-job-hr" />
                  <p className="latest-job-description">{job.description}</p>
                </div>
              </div>
            ))}
        </div>
      </SectionLoading>
    </div>
  );
}
