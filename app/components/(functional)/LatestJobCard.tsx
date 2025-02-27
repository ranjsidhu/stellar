"use client";

import { useRouter } from "next/navigation";
import type { LatestJobCardProps } from "@/app/types";
import Markdown from "markdown-to-jsx";
import { MapPinIcon, PoundSterlingIcon } from "lucide-react";

export default function LatestJobCard({ job }: LatestJobCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/job?reference=${job.reference_number}`)}
      className="w-full bg-white rounded-lg shadow-md p-5 text-left text-[#00150f] h-[400px]
        transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-[#00150f] 
        hover:text-white hover:shadow-lg flex flex-col"
      aria-label={`Job listing for ${job.role_name}`}
    >
      <h3 className="text-xl font-bold mb-4 line-clamp-2">{job.role_name}</h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <p>{job.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <PoundSterlingIcon
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="font-semibold">{job.salary_range}</p>
        </div>
      </div>

      <div className="mt-auto">
        <hr className="w-[70%] border-t border-[#00150f] transition-all duration-300 my-4" />
        <div className="prose prose-sm max-w-none line-clamp-4 overflow-hidden">
          <Markdown
            options={{
              overrides: {
                p: {
                  component: ({ children }) => (
                    <p className="text-sm">{children}</p>
                  ),
                },
                h1: {
                  component: ({ children }) => (
                    <p className="text-sm font-bold">{children}</p>
                  ),
                },
                h2: {
                  component: ({ children }) => (
                    <p className="text-sm font-bold">{children}</p>
                  ),
                },
                h3: {
                  component: ({ children }) => (
                    <p className="text-sm font-bold">{children}</p>
                  ),
                },
                h4: {
                  component: ({ children }) => (
                    <p className="text-sm font-bold">{children}</p>
                  ),
                },
                h5: {
                  component: ({ children }) => (
                    <p className="text-sm font-bold">{children}</p>
                  ),
                },
                h6: {
                  component: ({ children }) => (
                    <p className="text-sm font-bold">{children}</p>
                  ),
                },
                a: {
                  component: ({ children }) => (
                    <span className="text-sm">{children}</span>
                  ),
                },
                ul: {
                  component: ({ children }) => (
                    <div className="text-sm">{children}</div>
                  ),
                },
                ol: {
                  component: ({ children }) => (
                    <div className="text-sm">{children}</div>
                  ),
                },
                li: {
                  component: ({ children }) => (
                    <span className="text-sm">{children}</span>
                  ),
                },
              },
            }}
          >
            {job.description}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
