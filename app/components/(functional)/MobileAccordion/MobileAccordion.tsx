"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import type { AccordionProps } from "@/app/types";
import styles from "./MobileAccordion.module.css";

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
            <CaretUpIcon className={styles.accordionCaret} />
          ) : (
            <CaretDownIcon className={styles.accordionCaret} />
          )}
        </>
      );
    }
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
    <div className={styles.accordionItem} onClick={onClickHandler}>
      {/* Title */}
      <div className={styles.accordionTitle}>
        {name}
        <RenderIcon />
      </div>
      {/* Subroutes */}
      {isActive && subRoutes && (
        <div className={styles.accordionContent}>
          {subRoutes.map((c) => (
            <div key={c.name} className={styles.accordionDropdownButton}>
              <Link
                className={styles.mobileAccordionLink}
                href={c.route}
                onClick={() => toggleMenu && toggleMenu()}
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
