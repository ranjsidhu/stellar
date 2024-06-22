"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import "./navbar.css";

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
  subRoutes?: { name: string; route: string }[];
};

export default function NavButton({
  children,
  href,
  subRoutes,
}: NavButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = !subRoutes && pathname === href ? "navbar-route-active" : "";

  const Subroutes = () => {
    return (
      <ul className="nav-button-subroutes">
        {subRoutes?.map(({ name, route }) => (
          <div
            className="nav-button-subroute"
            key={name}
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
      className={`navbar-route ${isActive}`}
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
