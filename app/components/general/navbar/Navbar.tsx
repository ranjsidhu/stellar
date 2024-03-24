import React from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/app/constants";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "./navbar.css";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="nav-wrapper">
      <div className="header-nav">
        <ul>
          {routes.map(({ route, name, subRoutes }) => (
            <li key={route}>
              <a href={route} className="navbar-name">
                {name}
                {subRoutes && (
                  <CaretDownIcon className="navbar-caret" aria-hidden />
                )}
              </a>
              {subRoutes && (
                <div className="navbar-sub">
                  {subRoutes.map(({ name, route }) => (
                    <p key={name} onClick={() => router.push(route)}>
                      {name}
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
