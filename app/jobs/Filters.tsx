import { useState, SetStateAction } from "react";
import { Select, Input } from "antd";
import { useFetch } from "../hooks";
import { JobLocation, Job } from "../types";
import { pluralise } from "../utils";

type FiltersProps = {
  setDisplayJobs: React.Dispatch<SetStateAction<Job[]>>;
};

const { Search } = Input;

export default function Filters({ setDisplayJobs }: FiltersProps) {
  const [searchLoading, setSearchLoading] = useState(false);
  const { data: locations } = useFetch<JobLocation>("/jobs/locations");

  const getJobsByLocation = async (location: string) => {
    if (!location) {
      resetFilters();
    } else {
      await fetch(`/api/jobs/locations/${location}`).then((data) =>
        data.json().then((res) => setDisplayJobs(res.response))
      );
    }
  };

  const searchJobs = async ({
    target,
  }: {
    target: EventTarget & HTMLInputElement;
  }) => {
    const query = target.value;
    if (query.length === 0) {
      resetFilters();
    } else if (query.length >= 3) {
      setSearchLoading(true);
      await fetch(`/api/jobs/keywords/${query}`).then((data) =>
        data.json().then((res) => {
          setDisplayJobs(res.response);
          setSearchLoading(false);
        })
      );
    }
  };

  const resetFilters = async () => {
    setSearchLoading(false);
    await fetch(`/api/jobs/1`).then((data) =>
      data.json().then((res) => setDisplayJobs(res.response))
    );
  };

  return (
    <div className="jobs-filters">
      <Select
        allowClear
        showSearch
        className="filters-select"
        placeholder="Search by location"
        onChange={getJobsByLocation}
      >
        {locations.map((location) => (
          <Select.Option key={location.location}>
            <div className="filters-select-option">
              <p>{location.location}</p>
              <p>{pluralise(location.location_count, "job")}</p>
            </div>
          </Select.Option>
        ))}
      </Select>
      <Search
        allowClear
        placeholder="Birmingham, £100, Maths etc."
        onChange={searchJobs}
        loading={searchLoading}
      />
    </div>
  );
}
