import Link from "next/link";
import { socials } from "@/app/constants";
import styles from "./Socials.module.css";

export default function Socials() {
  return (
    <div className={styles.socials}>
      {socials.map((social) => (
        <Link key={social} href="#" className={`fa fa-${social}`}></Link>
      ))}
    </div>
  );
}
