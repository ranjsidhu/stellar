"use client";

import { useAppDispatch } from "@/lib/hooks";
import { MobileAccordion } from "@/app/components";
import { routes, authRoutes } from "@/app/constants";
import { MobileMenuProps } from "@/app/types";
import { clearSession, setAuthenticated } from "@/lib/features/Auth";
import styles from "./MobileMenu.module.css";

export default function MobileMenu({ toggleMenu, role }: MobileMenuProps) {
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
    <div className={styles.mobileMenu}>
      <nav className={styles.mobileNavbarContainer}>
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
