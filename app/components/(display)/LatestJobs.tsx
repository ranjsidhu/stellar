"use client";

import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks";
import type { Job } from "@/app/types";
import { SectionLoading, LatestJobCard } from "@/app/components";
import { ChevronRight } from "lucide-react";

export default function LatestJobs() {
  const router = useRouter();
  const { isLoading, data: jobs } = useFetch<Job>("/jobs/latest/5");

  return (
    <section className="w-full max-w-[1440px] px-4 md:px-6 lg:px-8 mb-16">
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <h2
          onClick={() => router.push("/jobs")}
          className="text-[#00150f] text-xl md:text-2xl font-bold uppercase tracking-wide
            hover:cursor-pointer hover:underline hover:underline-offset-4 transition-all duration-200"
        >
          Latest Jobs
        </h2>

        <button
          onClick={() => router.push("/jobs")}
          className="flex items-center text-[#00150f] text-sm font-medium hover:text-amber-600 transition-colors duration-200"
        >
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <SectionLoading loading={isLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 h-auto md:h-[450px]">
          {jobs && jobs.map((job) => <LatestJobCard key={job.id} job={job} />)}
        </div>
      </SectionLoading>
    </section>
  );
}
