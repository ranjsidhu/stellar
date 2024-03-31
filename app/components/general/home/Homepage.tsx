"use client";

import { Search, Jobs } from "@/app/components";
import { useFetchJobs } from "@/app/hooks";
import "./homepage.css";

export default function Homepage() {
  // useFetchJobs();

  return (
    <>
      <div className="homepage-images">
        <div className="homepage-hero">
          <h2 className="homepage-hero-title">
            Welcome to Stellar Recruitment, where stars align with schools and
            educators! Whether you&apos;re a cover, supply, or classroom
            teacher, count on us to connect you with exceptional opportunities.
            Explore our website to discover how we can help you shine in your
            teaching career. Let&apos;s make an impact in education together!
          </h2>
        </div>
        <div className="homepage-search-wrapper">
          <Search source="home" />
        </div>
      </div>
      <Jobs />
    </>
  );
}
