"use client";

import { useState } from "react";
import { Hamburger, MobileMenu } from "@/app/components";

export default function MobileMenuWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <Hamburger isMobileMenuOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />
      {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} />}
    </>
  );
}
