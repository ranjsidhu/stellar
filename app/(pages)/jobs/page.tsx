import { Suspense } from "react";
import Jobs from "./Jobs";

export default function JobsPage() {
  return (
    <Suspense>
      <Jobs />
    </Suspense>
  );
}
