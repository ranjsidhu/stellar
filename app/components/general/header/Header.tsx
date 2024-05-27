"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DARK } from "@/app/assets";
import { Hamburger, Navbar, HeaderButtons, MobileMenu } from "@/app/components";
import "./header.css";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

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
      {isMobileMenuOpen && (
        <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
      )}
    </>
  );
}
