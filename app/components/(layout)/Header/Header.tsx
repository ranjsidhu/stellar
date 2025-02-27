"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { DARK } from "@/app/assets";
import { Hamburger, Navbar, HeaderButtons, MobileMenu } from "@/app/components";

export default function Header({ role }: { role: string | undefined | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const hideOn = ["/login", "/register"];
  const isHidden = hideOn.includes(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (isHidden) return null;

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center bg-[#00150f]">
        <header className="w-[95vw] max-w-7xl h-[180px] lg:h-[220px] mx-auto flex justify-between items-center">
          <div className="mr-auto w-1/5 h-full flex items-center justify-start lg:justify-center">
            <Image
              src={DARK}
              alt="logo"
              className="w-auto h-4/5 aspect-auto transition-transform duration-300 cursor-pointer"
              onClick={() => router.push("/")}
              priority
            />
          </div>
          <div className="h-full mt-auto mb-auto hidden lg:flex flex-col justify-center items-center">
            <HeaderButtons />
            <Navbar />
          </div>
          <Hamburger
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMenu={toggleMenu}
          />
        </header>
      </div>

      {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} role={role} />}
    </>
  );
}
