import "./header.css";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { DARK } from "@/app/assets";
import { Hamburger, Navbar, HeaderButtons } from "@/app/components";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
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
        <Hamburger />
      </header>
    </>
  );
}
