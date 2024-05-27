import { routes } from "@/app/constants";
import NavButton from "./NavButton";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-wrapper">
      <ul className="navbar-ul">
        {routes.map(({ route, name, subRoutes }) => (
          <NavButton key={route} href={route} subRoutes={subRoutes}>
            {name}
          </NavButton>
        ))}
      </ul>
    </nav>
  );
}
