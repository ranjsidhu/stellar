"use client";

import { useState, useEffect, Suspense } from "react";
import { Pagination, PaginationProps } from "antd";
import { CircularProgress } from "@mui/material";
import { useFetch } from "@/app/hooks";
import { Job } from "../types";
import { JobCard } from "../components";
import Filters from "./Filters";
import "./jobs.css";

export default function Jobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [displayJobs, setDisplayJobs] = useState<Job[]>([]);
  const { isLoading, data: jobs } = useFetch<Job>("/jobs/1");

  useEffect(() => {
    setDisplayJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    const getCount = async () => {
      await fetch("/api/jobs/count").then((data) =>
        data.json().then((res) => setTotal(res.response))
      );
    };
    getCount();
  }, []);

  const useOnPaginationChange: PaginationProps["onChange"] = async (page) => {
    const { data: jobs } = useFetch<Job>(`/jobs/${page}`);
    setDisplayJobs(jobs);
    setCurrentPage(page);
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="jobs-wrapper">
        <div className="jobs-filters-grid">
          <Filters setDisplayJobs={setDisplayJobs} />
          <p>Found {displayJobs.length} jobs</p>
          <div className="jobs-grid">
            {isLoading && <CircularProgress />}
            {!isLoading &&
              displayJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>

        <div className="jobs-pagination">
          <Pagination
            showSizeChanger={false}
            defaultCurrent={1}
            current={currentPage}
            onChange={useOnPaginationChange}
            total={total}
          />
        </div>
      </div>
    </Suspense>
  );
}
