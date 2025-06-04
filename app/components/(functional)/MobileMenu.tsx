import { X } from "lucide-react";
import { MobileAccordion } from "@/app/components";
import { routes } from "@/app/constants";
import { MobileMenuProps } from "@/app/types";
import { signOutAction } from "./serveractions";

export default function MobileMenu({
  toggleMenu,
  session,
  userDetails,
}: Readonly<MobileMenuProps>) {
  console.log("🚀 ~ session:", session);
  return (
    <div className="fixed inset-0 z-50 bg-[#00150f] flex flex-col overflow-hidden animate-[fadeIn_150ms_ease-in]">
      <div className="flex justify-between items-center p-4 border-b border-amber-300/30">
        <h2 className="text-xl font-bold text-white">Menu</h2>
        <button
          onClick={toggleMenu}
          className="p-2 text-white hover:text-amber-300 transition-colors duration-100 focus:outline-none"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col w-full divide-y divide-emerald-900/50">
          {routes.map((route) => (
            <MobileAccordion
              key={route.name}
              name={route.name}
              route={route.route}
              subRoutes={route.subRoutes}
              toggleMenu={toggleMenu}
            />
          ))}

          {!session?.user && (
            <MobileAccordion
              name="Sign in"
              route="/auth/sign-in"
              toggleMenu={toggleMenu}
            />
          )}

          {userDetails?.roles && userDetails?.roles.name === "Admin" && (
            <MobileAccordion
              name="Admin"
              route="/admin"
              toggleMenu={toggleMenu}
            />
          )}

          {session?.user && (
            <MobileAccordion
              name="Profile"
              route="/profile"
              toggleMenu={toggleMenu}
            />
          )}

          {session?.user && (
            <MobileAccordion name="Sign out" handleOnClick={signOutAction} />
          )}
        </nav>
      </div>

      <div className="p-6 text-center text-white/60 text-sm border-t border-emerald-900/50">
        <p>© {new Date().getFullYear()} Stellar Recruitment</p>
      </div>
    </div>
  );
}
