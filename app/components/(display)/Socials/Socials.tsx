import Link from "next/link";
import { socials } from "@/app/constants";
import { ADMIN_CARDS } from "@/app/constants/admin";

type SocialsProps = {
  className: string | undefined;
  pathname?: string;
};

export default function Socials({ className, pathname }: SocialsProps) {
  const adminRoutes = ADMIN_CARDS.map((card) => card.route);
  const hideOn = [...adminRoutes, "/admin", "/profile"];
  return (
    <>
      {pathname && hideOn.includes(pathname) && <></>}
      {!pathname ||
        (!hideOn.includes(pathname) && (
          <div className={className}>
            {socials.map((social) => (
              <Link key={social} href="#" className={`fa fa-${social}`}></Link>
            ))}
          </div>
        ))}
    </>
  );
}
