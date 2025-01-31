"use client";

import Link from "next/link";
import { routes } from "@/app/constants";
import styles from "./Footer.module.css";
import { CopyrightSocials } from "./static";

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

        <CopyrightSocials />
      </div>
    </div>
  );
}
