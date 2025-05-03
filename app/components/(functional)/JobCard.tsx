"use client";

import { useRouter } from "next/navigation";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { JobProps } from "@/app/types";
import { calculateHours } from "@/app/utils";
import Markdown from "markdown-to-jsx";

export default function JobCard({ job }: Readonly<JobProps>) {
  const router = useRouter();

  return (
    <button
      className="w-full max-w-lg h-auto min-h-[300px] flex flex-col gap-2 rounded-lg shadow-md text-left p-6 lg:p-8 text-emerald-950 transition-colors duration-500 ease-in-out hover:cursor-pointer hover:bg-emerald-950 hover:shadow-[0_0_10px_0_gold] hover:text-white md:max-w-md sm:p-5"
      onClick={(e) => {
        e.preventDefault();
        if (window.location.href.includes("/admin/jobs")) {
          router.push(`/admin/jobs/${job.reference_number}`);
          return;
        }
        router.push(`/job?reference=${job.reference_number}`);
      }}
    >
      <h3 className="font-extrabold text-2xl">{job.role_name}</h3>
      <p className="mb-auto">{calculateHours(job.created_at)}</p>

      <p className="flex place-items-center gap-2">
        <DrawingPinIcon className="-rotate-45" /> {job.location} |{"  "}
        <strong>{job.salary_range}</strong>
      </p>

      <div className="mt-auto">
        <p className="line-clamp-4 overflow-hidden text-ellipsis">
          <Markdown>{job.description}</Markdown>
        </p>
      </div>
    </button>
  );
}
