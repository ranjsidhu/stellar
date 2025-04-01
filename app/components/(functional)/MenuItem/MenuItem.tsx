"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { MenuItemProps } from "@/app/types";

export default function MenuItem({
  children,
  href,
  subRoutes,
}: Readonly<MenuItemProps>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = !subRoutes && pathname === href;

  return (
    <button
      className="relative h-full group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <div
        className={`h-full px-3 py-2 bg-transparent flex items-center gap-1 text-base font-medium rounded-md transition duration-200
          ${
            isActive
              ? "text-yellow-400"
              : "text-white group-hover:text-yellow-400"
          }`}
        aria-expanded={isOpen}
        aria-haspopup={!!subRoutes}
      >
        <Link
          href={href}
          className="focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded"
        >
          {children}
        </Link>

        {subRoutes && (
          <span className="flex items-center">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
        )}
      </div>

      {subRoutes && (
        <div
          className={`absolute top-full left-0 z-50 min-w-[180px] transform transition-all duration-200 origin-top-left
            ${
              isOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
        >
          <ul className="mt-1 py-1 bg-[#00150f] rounded-md shadow-lg shadow-yellow-400/20 border border-yellow-400/10 overflow-hidden">
            {subRoutes.map(({ name, route }) => (
              <li key={name}>
                <Link
                  href={route}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#002a1c] hover:text-yellow-400 
                    transition duration-150 focus:outline-none focus:bg-[#002a1c] focus:text-yellow-400"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}
