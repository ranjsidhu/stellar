"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { DARK } from "@/app/assets";
import { Hamburger, Navbar, HeaderButtons } from "@/app/components";
import "./header.css";
import "./socials.css";

type HeaderProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
};

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const validPaths = ["/login", "/register"];
  const isValidPathname = validPaths.includes(pathname);

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
              <HeaderButtons />
              <Navbar />
            </div>
            <Hamburger
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
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
    </>
  );
}
