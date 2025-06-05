import type { Metadata } from "next";
import { Suspense } from "react";
import Jobs from "./Jobs";

export const metadata: Metadata = {
  title: "Open Positions",
  description: "Jobs",
};

export default function JobsPage() {
  return (
    <Suspense>
      <Jobs />
    </Suspense>
  );
}
