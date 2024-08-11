import Link from "next/link";
import { Socials } from "@/app/components";
import { routes } from "@/app/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.layoutFooter}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          {routes.map((route, index: number) => (
            <Link key={index} href={route.route} className={styles.footerLink}>
              {route.name}
            </Link>
          ))}
        </div>

        <Socials className={styles.footerSocials} />

        <div className={styles.footerLegal}>
          <p>
            Company Registration Number: 15228068 | All rights reserved Stellar
            Recruitment
          </p>
          <p>
            Copyright &copy;{" "}
            <a href={`mailto:${process.env.NEXT_PUBLIC_DEV_EMAIL}`}>
              Ranj Sidhu 2024
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
