import type { Metadata } from "next";
import { Suspense } from "react";
import AdminJobs from "./AdminJobs";

export const metadata: Metadata = {
  title: "Job Management",
};

export default function AdminJobsPage() {
  return (
    <Suspense>
      <AdminJobs />
    </Suspense>
  );
}
