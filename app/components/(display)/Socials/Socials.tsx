import Link from "next/link";
import { socials } from "@/app/constants";

type SocialsProps = {
  className: string | undefined;
};

export default function Socials({ className }: SocialsProps) {
  return (
    <div className={className}>
      {socials.map((social) => (
        <Link key={social} href="#" className={`fa fa-${social}`}></Link>
      ))}
    </div>
  );
}
