"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthenticated } from "@/lib/features/Auth";
import { DARK } from "@/app/assets";
import { Hamburger, Navbar, HeaderButtons, MobileMenu } from "@/app/components";
import "./header.css";
import "./socials.css";

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
        <div className="header">
          <header className="header-wrapper">
            <div className="header-logo">
              <Image
                src={DARK}
                alt="logo"
                className="header-logo-image"
                onClick={() => router.push("/")}
                priority
              />
            </div>
            <div className="header-navigation">
              <HeaderButtons role={role} />
              <Navbar />
            </div>
            <Hamburger isMobile={isMobileMenuOpen} toggleMenu={toggleMenu} />
          </header>
        </div>
      )}

      {!isValidPathname && !isMobileMenuOpen && (
        <div className="header-socials">
          <a href="#" target="_blank" className="fa fa-facebook"></a>
          <a href="#" target="_blank" className="fa fa-instagram"></a>
          <a href="#" target="_blank" className="fa fa-linkedin"></a>
          <a href="#" target="_blank" className="fa fa-envelope"></a>
        </div>
      )}

      {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} role={role} />}
    </>
  );
}
