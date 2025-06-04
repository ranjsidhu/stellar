import { routes } from "@/app/constants";
import { MenuItem } from "@/app/components";
import { getSession } from "@/app/utils/session";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import SignOut from "../(functional)/SignOut";
import SignIn from "../(functional)/SignIn";

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="flex justify-between items-center text-white w-full bg-[#00150f] py-4">
      <ul className="flex flex-wrap gap-8 items-center justify-center text-base z-50 w-full">
        {routes.map(({ route, name, subRoutes }) => (
          <MenuItem key={route} href={route} subRoutes={subRoutes}>
            {name}
          </MenuItem>
        ))}
        {session && session.user && (
          <>
            <li>
              <Link
                href="/profile"
                className="flex items-center justify-center"
              >
                <UserOutlined style={{ color: "#DAA520", fontSize: 24 }} />
              </Link>
            </li>
            <li>
              <SignOut />
            </li>
          </>
        )}
        {(!session || !session.user) && (
          <li>
            <SignIn />
          </li>
        )}
      </ul>
    </nav>
  );
}
