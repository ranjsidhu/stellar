"use client";

import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks";
import { Job } from "@/app/types";
import { SectionLoading } from "@/app/components";
import "./jobs.css";

export default function Jobs() {
  const router = useRouter();
  const { isLoading, data: jobs } = useFetch<Job>("/jobs/5");

  return (
    <div className="jobs-container-wrapper">
      <p className="jobs-wrapper-title" onClick={() => router.push("/jobs")}>
        Latest jobs
      </p>
      <SectionLoading loading={isLoading}>
        <div className="jobs-wrapper">
          {jobs &&
            jobs.map((job) => (
              <div
                key={job.id}
                className="job-card"
                onClick={() => {
                  // TODO: define function or route to job details page, add id to URL, parse on details page
                  router.push(`/jobs?id=${job.id}`);
                }}
              >
                <h3 className="job-role-name">{job.role_name}</h3>

                <div className="job-mid-wrapper">
                  <p className="job-location">{job.location}</p>
                  <p className="job-salary">
                    <strong>{job.salary_range}</strong>
                  </p>
                </div>

                <div className="job-footer-wrapper">
                  <hr className="job-hr" />
                  <p className="job-description">{job.description}</p>
                </div>
              </div>
            ))}
        </div>
      </SectionLoading>
    </div>
  );
}
