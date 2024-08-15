"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import type { AccordionProps } from "@/app/types";
import "./mobile-menu.css";

export default function MobileAccordion({
  name,
  route,
  subRoutes,
  toggleMenu,
  handleOnClick,
}: AccordionProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const RenderIcon = () => {
    if (subRoutes) {
      return (
        <>
          {isActive && subRoutes ? (
            <CaretUpIcon className="accordion-caret" />
          ) : (
            <CaretDownIcon className="accordion-caret" />
          )}
        </>
      );
    }
    return <></>;
  };

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
                  toggleMenu && toggleMenu();
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
