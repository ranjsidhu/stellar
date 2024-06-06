"use client";

import { useState, useEffect } from "react";
import { Pagination, PaginationProps } from "antd";
import { useFetch } from "@/app/hooks";
import { JobLocation, Job } from "../types";
import { SectionLoading, JobCard } from "../components";
import "./jobs.css";

export default function Jobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { isLoading, data: locations } =
    useFetch<JobLocation>("/jobs/locations");
  const { data: jobs } = useFetch<Job>("/jobs/1");

  useEffect(() => {
    const getCount = async () => {
      await fetch("/api/jobs/count").then((data) =>
        data.json().then((res) => setTotal(res.response))
      );
    };
    getCount();
  }, []);

  const onPaginationChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="jobs-wrapper">
      <div className="jobs-filters-grid">
        <div className="jobs-filters"></div>
        <SectionLoading loading={isLoading}>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </SectionLoading>
      </div>

      <div className="jobs-pagination">
        <Pagination
          showSizeChanger={false}
          defaultCurrent={1}
          current={currentPage}
          onChange={onPaginationChange}
          total={total}
        />
      </div>
    </div>
  );
}
