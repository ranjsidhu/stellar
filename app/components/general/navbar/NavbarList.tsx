"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/app/constants";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "./navbar.css";

export default function NavbarList() {
  const router = useRouter();
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const handleHover = (route: string | null) => {
    setHoveredRoute(route);
  };

  return (
    <ul>
      {routes.map(({ route, name, subRoutes }) => (
        <li
          className="navbar-route"
          key={route}
          onMouseEnter={() => handleHover(route)}
          onMouseLeave={() => handleHover(null)}
        >
          <div className="navbar-item">
            <a href={route} className="navbar-name">
              {name}
              {subRoutes && (
                <CaretDownIcon
                  className="navbar-caret"
                  aria-hidden
                  onMouseEnter={() => handleHover(route)}
                />
              )}
            </a>
            {hoveredRoute === route && subRoutes && (
              <div className="navbar-sub">
                {subRoutes.map(({ name, route }) => (
                  <p key={name} onClick={() => router.push(route)}>
                    {name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
