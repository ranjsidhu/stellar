"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { AccordionProps } from "@/app/types";

export default function MobileAccordion({
  name,
  route,
  subRoutes,
  toggleMenu,
  handleOnClick,
}: Readonly<AccordionProps>) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const onClickHandler = () => {
    if (route && !subRoutes) {
      toggleMenu && toggleMenu();
      router.push(route);
    } else if (subRoutes) {
      setIsActive(!isActive);
    }
    if (handleOnClick) {
      handleOnClick();
    }
  };

  return (
    <div className="w-full border-b border-amber-300/30">
      {/* Title */}
      <button
        className="w-full h-14 px-6 flex items-center justify-between bg-[#00150f] 
          text-white text-lg font-medium focus:outline-none focus:bg-emerald-900 
          transition-all duration-200 hover:bg-emerald-900"
        onClick={onClickHandler}
        aria-expanded={isActive}
      >
        <span>{name}</span>
        {subRoutes && (
          <span className="flex items-center justify-center">
            {isActive ? (
              <ChevronUp className="w-5 h-5 text-amber-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-amber-300" />
            )}
          </span>
        )}
      </button>

      {/* Subroutes */}
      {isActive && subRoutes && (
        <div
          className={`bg-emerald-900/50 overflow-hidden transition-all duration-300`}
        >
          {subRoutes.map((item) => (
            <Link
              key={item.name}
              href={item.route}
              onClick={() => toggleMenu && toggleMenu()}
              className="block w-full py-4 px-10 text-white/90 hover:text-white hover:bg-emerald-800 
                transition-all duration-200 text-base border-l-2 border-transparent hover:border-amber-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
