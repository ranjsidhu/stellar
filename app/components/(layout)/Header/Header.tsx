"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthenticated } from "@/lib/features/Auth";
import { DARK } from "@/app/assets";
import {
  Hamburger,
  Navbar,
  HeaderButtons,
  MobileMenu,
  Socials,
} from "@/app/components";
import styles from "./Header.module.css";

export default function Header({ role }: { role: string | undefined | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const validPaths = ["/login", "/register"];
  const isValidPathname = validPaths.includes(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (role === "authenticated") {
      dispatch(setAuthenticated(true));
    }
  }, [dispatch, role, router]);

  return (
    <>
      {!isValidPathname && (
        <div className={styles.header}>
          <header className={styles.headerWrapper}>
            <div className={styles.headerLogo}>
              <Image
                src={DARK}
                alt="logo"
                className={styles.headerLogoImage}
                onClick={() => router.push("/")}
                priority
              />
            </div>
            <div className={styles.headerNavigation}>
              <HeaderButtons role={role} />
              <Navbar />
            </div>
            <Hamburger isMobile={isMobileMenuOpen} toggleMenu={toggleMenu} />
          </header>
        </div>
      )}

      {!isValidPathname && !isMobileMenuOpen && pathname !== "/profile" && (
        <Socials className={styles.headerSocials} />
      )}

      {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} role={role} />}
    </>
  );
}
