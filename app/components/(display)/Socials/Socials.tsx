import Link from "next/link";
import { socials } from "@/app/constants";
import { ADMIN_CARDS } from "@/app/constants/admin";

type SocialsProps = {
  className: string | undefined;
  pathname?: string;
};

export default function Socials({ className, pathname }: SocialsProps) {
  const adminRoutes = ADMIN_CARDS.map((card) => card.route);
  const hideOn = [...adminRoutes, "/admin", "/profile", "/admin/configuration"];

  const shouldHide = (path: string) => {
    return hideOn.includes(path) || path.startsWith("/admin");
  };

  return (
    <>
      {pathname && shouldHide(pathname) && <></>}
      {!pathname ||
        (!shouldHide(pathname) && !hideOn.includes(pathname) && (
          <div className={className}>
            {socials.map((social) => (
              <Link
                key={social.className}
                href={social.href}
                className={`fa fa-${social.className}`}
                target="_blank"
              ></Link>
            ))}
          </div>
        ))}
    </>
  );
}
