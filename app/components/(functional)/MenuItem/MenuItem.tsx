"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import type { MenuItemProps } from "@/app/types";
import styles from "./MenuItem.module.css";

export default function MenuItem({ children, href, subRoutes }: MenuItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = !subRoutes && pathname === href ? styles.menuItemActive : "";

  const Subroutes = () => {
    return (
      <ul className={styles.menuItemSubroutes}>
        {subRoutes?.map(({ name, route }) => (
          <div
            key={name}
            className={styles.menuItemSubroute}
            onClick={() => router.push(route)}
          >
            {name}
          </div>
        ))}
      </ul>
    );
  };

  return (
    <button
      className={`${styles.menuItem} ${isActive}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href}>{children}</Link>
      {isHovered && subRoutes && <CaretUpIcon aria-hidden />}
      {!isHovered && subRoutes && <CaretDownIcon aria-hidden />}
      {isHovered && subRoutes && <Subroutes />}
    </button>
  );
}
