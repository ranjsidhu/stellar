import { routes } from "@/app/constants";
import { MenuItem } from "@/app/components";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center text-white h-[88px]">
      <ul className="h-full flex gap-8 items-center justify-center text-base z-50">
        {routes.map(({ route, name, subRoutes }) => (
          <MenuItem key={route} href={route} subRoutes={subRoutes}>
            {name}
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}
