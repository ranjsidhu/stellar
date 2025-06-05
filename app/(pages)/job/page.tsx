import type { Metadata } from "next";
import { Suspense } from "react";
import JobDetails from "./JobDetails";

export const metadata: Metadata = {
  title: "Job Details",
  description: "Job Details",
};

export default function JobPage() {
  return (
    <Suspense>
      <JobDetails />
    </Suspense>
  );
}
