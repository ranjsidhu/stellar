"use client";

import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/app/constants";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "./navbar.css";

export default function NavbarList() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ul className="navbar-ul">
      {routes.map(({ route, name, subRoutes }) => (
        <li
          className={`navbar-route${
            !subRoutes && pathname === route ? "-active" : ""
          }`}
          key={route}
        >
          <a href={route} className="navbar-name">
            {name}
            {subRoutes && (
              <CaretDownIcon className="navbar-caret" aria-hidden />
            )}
          </a>
          {subRoutes && (
            <ul className="navbar-sub">
              {subRoutes.map(({ name, route }) => (
                <li
                  className={`navbar-route${
                    pathname === route ? "-active" : ""
                  }`}
                  key={name}
                  onClick={() => router.push(route)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
