"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Select, Input } from "antd";
import { useFetch } from "@/app/hooks";
import { JobLocation, FiltersProps } from "@/app/types";
import { pluralise } from "@/app/utils";

const { Search } = Input;

export default function Filters({ setDisplayJobs }: Readonly<FiltersProps>) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchLoading, setSearchLoading] = useState(false);
  const { data: locations } = useFetch<JobLocation>("/jobs/locations");

  const resetFilters = useCallback(async () => {
    setSearchLoading(false);
    await fetch(`/api/jobs/1`).then((data) =>
      data.json().then((res) => setDisplayJobs(res.response))
    );
  }, [setDisplayJobs]);

  const getJobsByLocation = async (location: string) => {
    if (!location) {
      resetFilters();
    } else {
      await fetch(`/api/jobs/locations/${location}`).then((data) =>
        data.json().then((res) => setDisplayJobs(res.response))
      );
    }
  };

  const searchJobs = useCallback(
    async ({
      target,
    }: {
      target: (EventTarget & HTMLInputElement) | { value: string };
    }) => {
      const query = target.value;
      if (query.length === 0) {
        resetFilters();
      } else if (query.length >= 3 || search) {
        setSearchLoading(true);
        await fetch(`/api/jobs/keywords/${query}`).then((data) =>
          data.json().then((res) => {
            setDisplayJobs(res.response);
            setSearchLoading(false);
          })
        );
      }
    },
    [resetFilters, search, setDisplayJobs]
  );

  useEffect(() => {
    if (search) {
      searchJobs({ target: { value: search } });
    }
  }, [search, searchJobs]);

  return (
    <div className="flex gap-[50px] md:flex-col md:gap-5">
      <Select
        allowClear
        showSearch
        className="w-[450px]"
        placeholder="Search by location"
        onChange={getJobsByLocation}
      >
        {locations.map((location) => (
          <Select.Option key={location.location}>
            <div className="flex justify-between">
              <p>{location.location}</p>
              <p>{pluralise(location.location_count, "job")}</p>
            </div>
          </Select.Option>
        ))}
      </Select>
      <Search
        defaultValue={search ?? ""}
        allowClear
        placeholder="Birmingham, £100, Maths etc."
        onChange={searchJobs}
        loading={searchLoading}
      />
    </div>
  );
}
