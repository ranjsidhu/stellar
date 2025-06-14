"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination, PaginationProps } from "antd";
import { CircularProgress } from "@mui/material";
import { useFetch } from "@/app/hooks";
import { Job } from "../../types";
import { JobCard, Filters } from "../../components";

export default function Jobs() {
  const params = useSearchParams();
  const searchQuery = params.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(0);
  const [displayJobs, setDisplayJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: currentJobs,
    isLoading,
    count,
  } = useFetch<Job>(`/jobs/${page}`);

  useEffect(() => {
    if (!searchQuery) {
      setDisplayJobs(currentJobs);
    }
  }, [currentJobs, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setTotal(count ?? 0);
    }
  }, [count, searchQuery]);

  const onPaginationChange: PaginationProps["onChange"] = (newPage) => {
    setPage(newPage);
    setCurrentPage(newPage);
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {displayJobs && (
          <div className="space-y-8">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Filters setDisplayJobs={setDisplayJobs} setTotal={setTotal} />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">
                Found <span className="font-bold">{total}</span> jobs
              </p>
              <div className="hidden md:block">
                <Pagination
                  showSizeChanger={false}
                  defaultCurrent={1}
                  current={currentPage}
                  onChange={onPaginationChange}
                  total={total}
                  className="inline-flex"
                />
              </div>
            </div>

            {/* Job Cards Grid */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <CircularProgress />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayJobs.map((job) => (
                  <div key={job.id} className="transition-all hover:shadow-lg">
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Pagination (Bottom) */}
            <div className="mt-8 flex justify-center md:hidden">
              <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                current={currentPage}
                onChange={onPaginationChange}
                total={total}
                className="inline-flex"
              />
            </div>

            {/* Desktop Pagination (Bottom) */}
            <div className="mt-8 hidden md:flex justify-center">
              <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                current={currentPage}
                onChange={onPaginationChange}
                total={total}
                className="inline-flex"
              />
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
