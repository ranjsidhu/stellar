"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/app/constants";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "./navbar.css";

export default function NavbarList() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const handleHover = (route: string | null) => {
    setHoveredRoute(route);
  };

  return (
    <ul>
      {routes.map(({ route, name, subRoutes }) => (
        <li
          className={`navbar-route${
            !subRoutes && pathname === route ? "-active" : ""
          }`}
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
                  <p
                    className={`navbar-route${
                      pathname === route ? "-active" : ""
                    }`}
                    key={name}
                    onClick={() => router.push(route)}
                  >
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

// TODO - remove this comment

// const [formData, setFormData] = useState({
//     name: "",
//     contactNumber: "",
//     friend: {
//       name: "",
//       job: "",
//       phone: "",
//       location: "",
//       email: "",
//     },
//   });
