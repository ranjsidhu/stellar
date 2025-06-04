import { Suspense } from "react";
import AdminJobs from "./AdminJobs";

export default function AdminJobsPage() {
  return (
    <Suspense>
      <AdminJobs />
    </Suspense>
  );
}
