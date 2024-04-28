import "./header.css";

import { Hamburger, Navbar } from "@/app/components";

import { DARK } from "@/app/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
          <div className="header-buttons">
            <a
              className="header-button"
              onClick={() => {
                router.push("/register");
              }}
            >
              Register{" "}
            </a>
            <a
              className="header-button"
              onClick={() => {
                router.push("/login?type=client");
              }}
            >
              Client Login
            </a>
            <a
              className="header-button"
              onClick={() => {
                router.push("/login?type=candidate");
              }}
            >
              Candidate Login
            </a>
            <a className="header-button">Call: 0123 456 789</a>
          </div>
          <Navbar />
        </div>
        <div className="header-hamburger">
          <Hamburger />
        </div>
      </header>
    </>
  );
}
