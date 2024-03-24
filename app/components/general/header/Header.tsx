import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/app/components";
import DARK from "@/app/assets/logos/Logo_dark.jpg";
import "./header.css";

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
            <a className="header-button">Register </a>
            <a className="header-button">Client Login</a>
            <a className="header-button">Candidate Login</a>
            <a className="header-button">Call: 0123 456 789</a>
          </div>
          <Navbar />
        </div>
      </header>
      <div className="header-socials">
        <a href="#" target="_blank" className="fa fa-facebook"></a>
        <a href="#" target="_blank" className="fa fa-instagram"></a>
        <a href="#" target="_blank" className="fa fa-linkedin"></a>
        <a href="#" target="_blank" className="fa fa-envelope"></a>
      </div>
    </>
  );
}
