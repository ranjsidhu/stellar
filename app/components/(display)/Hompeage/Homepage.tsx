"use client";

import { useEffect } from "react";
import { LatestJobs, Search } from "@/app/components";
import styles from "./Homepage.module.css";

export default function Homepage() {
  useEffect(() => {
    const url = window.location.href;
    if (url.includes("authenticated=true")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className={styles.homepageWrapper}>
      <div className={styles.homepageHeroContainer}>
        <div className={styles.homepageHero}>
          <em className={styles.homepageHeroTitle}>
            &quot;Connecting talent with opportunity&quot;
          </em>
        </div>
        <div className={styles.homepageSearchWrapper}>
          <Search source="home" />
        </div>
      </div>
      <div className={styles.homepageStatementWrapper}>
        <h2>
          Welcome to Stellar Recruitment, where stars align with schools and
          educators! Whether you&apos;re a cover, supply, or classroom teacher,
          count on us to connect you with exceptional opportunities. Explore our
          website to discover how we can help you shine in your teaching career.
          Let&apos;s make an impact in education together!
        </h2>
      </div>
      <div className={styles.homepageDividerImage} />
      <LatestJobs />
    </div>
  );
}
