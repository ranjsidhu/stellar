"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import "./mobile-menu.css";

type AccordionProps = {
  name: string;
  route: string;
  subRoutes?: { name: string; route: string }[];
  setIsMobileMenuOpen: (value: boolean) => void;
};

export default function MobileAccordion({
  name,
  route,
  subRoutes,
  setIsMobileMenuOpen,
}: AccordionProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const isExpanded = isActive ? "accordion-title-expanded" : "";

  const RenderIcon = () => {
    if (subRoutes) {
      return (
        <div>
          {isActive && subRoutes ? (
            <CaretUpIcon className="accordion-caret" />
          ) : (
            <CaretDownIcon className="accordion-caret" />
          )}
        </div>
      );
    }
    return <></>;
  };

  const onClickHandler = () => {
    if (route && !subRoutes) {
      setIsMobileMenuOpen(false);
      router.push(route);
    } else if (subRoutes) {
      setIsActive(!isActive);
    }
  };

  return (
    <div className="accordion-item" onClick={onClickHandler}>
      {/* Title */}
      <div className={`accordion-title`}>
        {name}
        <RenderIcon />
      </div>
      {/* Subroutes */}
      {isActive && subRoutes && (
        <div className="accordion-content">
          {subRoutes.map((c) => (
            <div key={c.name} className="accordion-dropdown-button">
              <Link
                className="mobile-accordion-link"
                href={c.route}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
