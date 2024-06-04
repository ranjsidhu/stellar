"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { Job } from "@/app/types";
import { SectionLoading } from "@/app/components";
import "./jobs.css";

export default function Jobs() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/jobs/5");
        const data: { response: Job[]; message: string } =
          await response.json();
        setJobs(data.response);
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
    };
    getJobs();
  }, []);

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
