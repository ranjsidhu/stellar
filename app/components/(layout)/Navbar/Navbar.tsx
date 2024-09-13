import { routes } from "@/app/constants";
import { MenuItem } from "@/app/components";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navWrapper}>
      <ul className={styles.navbarUl}>
        {routes.map(({ route, name, subRoutes }) => (
          <MenuItem key={route} href={route} subRoutes={subRoutes}>
            {name}
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}
