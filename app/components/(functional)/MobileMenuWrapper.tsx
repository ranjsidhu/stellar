"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { Hamburger, MobileMenu } from "@/app/components";
import type { User } from "@/app/types";

export default function MobileMenuWrapper({
  session,
  userDetails,
}: {
  session: Session | null;
  userDetails: User | null;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <Hamburger isMobileMenuOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />
      {isMobileMenuOpen && (
        <MobileMenu
          toggleMenu={toggleMenu}
          session={session}
          userDetails={userDetails}
        />
      )}
    </>
  );
}
