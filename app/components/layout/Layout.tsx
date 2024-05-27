"use client";

import { useState } from "react";
import { Footer, Header, Loading, MobileMenu } from "../../components";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="container">
      <Loading />
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {isMobileMenuOpen ? (
        <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
      ) : (
        children
      )}

      {!isMobileMenuOpen && <Footer />}
    </div>
  );
}
