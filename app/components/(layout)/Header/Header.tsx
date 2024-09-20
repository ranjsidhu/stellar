"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
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
  const hideOn = ["/login", "/register"];
  const isHidden = hideOn.includes(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {!isHidden && (
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
              <HeaderButtons />
              <Navbar />
            </div>
            <Hamburger isMobile={isMobileMenuOpen} toggleMenu={toggleMenu} />
          </header>
        </div>
      )}

      {!isHidden && !isMobileMenuOpen && (
        <Socials className={styles.headerSocials} pathname={pathname} />
      )}

      {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} role={role} />}
    </>
  );
}
