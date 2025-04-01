"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { DARK } from "@/app/assets";
import { Hamburger, Navbar, HeaderButtons, MobileMenu } from "@/app/components";
import type { HeaderProps } from "@/app/types";

export default function Header({ role }: Readonly<HeaderProps>) {
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
          <div className="mr-auto flex items-center h-full">
            <div className="relative h-[70%] w-auto aspect-[3/2] min-w-[120px]">
              <Image
                src={DARK}
                alt="logo"
                fill
                className="object-contain transition-transform duration-300 cursor-pointer"
                onClick={() => router.push("/")}
                priority
              />
            </div>
          </div>

          <div className="h-full mt-auto mb-auto hidden lg:flex flex-col justify-center items-center">
            <HeaderButtons />
            <Navbar />
          </div>

          <div className="flex items-center lg:hidden">
            <Hamburger
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </header>
      </div>

      {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} role={role} />}
    </>
  );
}
