import { Suspense } from "react";
import JobDetails from "./JobDetails";

export default function JobPage() {
  return (
    <Suspense>
      <JobDetails />
    </Suspense>
  );
}
