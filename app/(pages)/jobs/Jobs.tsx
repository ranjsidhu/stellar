"use client";

import { useState, useEffect, Suspense } from "react";
import { Pagination, PaginationProps } from "antd";
import { CircularProgress } from "@mui/material";
import { useFetch } from "@/app/hooks";
import { Job } from "../../types";
import { JobCard, Filters } from "../../components";
import styles from "./Jobs.module.css";

export default function Jobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [displayJobs, setDisplayJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const { data: currentJobs, isLoading } = useFetch<Job>(`/jobs/${page}`);

  useEffect(() => {
    setDisplayJobs(currentJobs);
  }, [currentJobs]);

  useEffect(() => {
    const getCount = async () => {
      await fetch("/api/jobs/count").then((data) =>
        data.json().then((res) => setTotal(res.response))
      );
    };
    getCount();
  }, []);

  const onPaginationChange: PaginationProps["onChange"] = (newPage) => {
    setPage(newPage);
    setCurrentPage(newPage);
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <div className={styles.jobsWrapper}>
        {displayJobs && (
          <div className={styles.jobsFiltersGrid}>
            <Filters setDisplayJobs={setDisplayJobs} />
            <p>Found {displayJobs.length} jobs</p>
            <div className={styles.jobsGrid}>
              {isLoading && <CircularProgress />}
              {!isLoading &&
                displayJobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          </div>
        )}

        <div className={styles.jobsPagination}>
          <Pagination
            showSizeChanger={false}
            defaultCurrent={1}
            current={currentPage}
            onChange={onPaginationChange}
            total={total}
          />
        </div>
      </div>
    </Suspense>
  );
}
