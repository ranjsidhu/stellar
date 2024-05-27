import { routes } from "@/app/constants";
import MobileAccordion from "./MobileAccordion";
import "./mobile-menu.css";

export default function MobileMenu({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
}) {
  return (
    <div className="mobile-menu">
      <nav className="mobile-navbar-container">
        {routes.map((route) => (
          <MobileAccordion
            key={route.name}
            name={route.name}
            route={route.route}
            subRoutes={route.subRoutes}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        ))}
      </nav>
    </div>
  );
}
