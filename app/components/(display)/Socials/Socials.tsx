import Link from "next/link";
import { socials } from "@/app/constants";

type SocialsProps = {
  className: string | undefined;
  pathname: string;
};

export default function Socials({ className, pathname }: SocialsProps) {
  const hideOn = ["/admin", "/profile"];
  return (
    <>
      {hideOn.includes(pathname) && <></>}
      {!hideOn.includes(pathname) && (
        <div className={className}>
          {socials.map((social) => (
            <Link key={social} href="#" className={`fa fa-${social}`}></Link>
          ))}
        </div>
      )}
    </>
  );
}
