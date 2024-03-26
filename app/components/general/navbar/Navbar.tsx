import NavbarList from "./NavbarList";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="header-nav">
        <NavbarList />
      </div>
    </nav>
  );
}
