import type { Metadata } from "next";

import { Values } from "@/app/components";
import { aboutUsText } from "@/app/constants";
import styles from "./AboutUs.module.css";

export const metadata: Metadata = {
  title:
    "Leading Educational Recruitment Agency in West Midlands - Stellar Recruitment",
  description: "Connecting talent with opportuninity in the West Midlands",
  alternates: {
    canonical: "https://stellar-recruitment.co.uk",
    types: {
      www: "https://www.stellar-recruitment.co.uk",
    },
  },
};

export default function AboutUsPage() {
  return (
    <section>
      <div className={styles.aboutUsHero}>
        <h2>About Us</h2>
      </div>
      <div className={styles.aboutUsWrapper}>
        <div className={styles.aboutUsStatement}>
          {aboutUsText.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
        <div className={styles.aboutUsValues}>
          <Values />
        </div>
      </div>
    </section>
  );
}
