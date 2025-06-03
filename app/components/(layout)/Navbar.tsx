import { routes } from "@/app/constants";
import { MenuItem } from "@/app/components";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center text-white w-full bg-[#00150f] py-4">
      <ul className="flex flex-wrap gap-8 items-center justify-center text-base z-50 w-full">
        {routes.map(({ route, name, subRoutes }) => (
          <MenuItem key={route} href={route} subRoutes={subRoutes}>
            {name}
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}

// TODO - add user profile button, sign out, sign in buttons
