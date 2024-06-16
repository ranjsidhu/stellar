import { routes } from "@/app/constants";
import MobileAccordion from "./MobileAccordion";
import "./mobile-menu.css";

export default function MobileMenu({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <div className="mobile-menu">
      <nav className="mobile-navbar-container">
        {routes.map((route) => (
          <MobileAccordion
            key={route.name}
            name={route.name}
            route={route.route}
            subRoutes={route.subRoutes}
            toggleMenu={toggleMenu}
          />
        ))}
      </nav>
    </div>
  );
}
