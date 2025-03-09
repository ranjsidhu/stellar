import Link from "next/link";
import { type AdminCardProps } from "@/app/types";

export default function AdminCard({
  title,
  description,
  route,
}: AdminCardProps) {
  return (
    <Link
      href={route}
      className="group block h-full overflow-hidden rounded-xl bg-[#00150f] shadow-md transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-800"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-yellow-400">{title}</h3>
          <div className="rounded-full bg-gray-800 p-2 text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-[#00150f]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </Link>
  );
}
