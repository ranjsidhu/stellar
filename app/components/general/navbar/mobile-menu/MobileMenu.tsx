"use client";

import { useAppDispatch } from "@/lib/hooks";
import { routes } from "@/app/constants";
import MobileAccordion from "./MobileAccordion";
import { Route } from "@/app/constants";
import { clearSession, setAuthenticated } from "@/lib/features/Auth";
import "./mobile-menu.css";

const authRoutes: Route[] = [
  {
    route: "/login",
    name: "Login",
  },
  {
    route: "/register",
    name: "Register",
  },
];

export default function MobileMenu({
  toggleMenu,
  role,
}: {
  toggleMenu: () => void;
  role: string | null | undefined;
}) {
  const dispatch = useAppDispatch();

  const signOut = async () => {
    fetch("/api/auth/signout", { method: "POST" }).then(() => {
      dispatch(clearSession());
      dispatch(setAuthenticated(false));
      window.location.reload();
      window.location.href = "/";
    });
  };

  return (
    <div className="mobile-menu">
      <nav className="mobile-navbar-container">
        {routes.map((route) => (
          <MobileAccordion
            key={route.name}
            name={route.name}
            route={route.route}
            subRoutes={route.subRoutes}
            toggleMenu={toggleMenu}
          />
        ))}

        {(!role || role !== "authenticated") &&
          authRoutes.map((route) => (
            <MobileAccordion
              key={route.name}
              name={route.name}
              route={route.route}
            />
          ))}
        {role === "authenticated" && (
          <MobileAccordion name="Sign out" handleOnClick={signOut} />
        )}
      </nav>
    </div>
  );
}
