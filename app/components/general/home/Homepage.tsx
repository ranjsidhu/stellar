"use client";

import { useEffect } from "react";
import { Jobs, Search } from "@/app/components";
import { useFetchJobs } from "@/app/hooks";
import "./homepage.css";

export default function Homepage() {
  useEffect(() => {
    const testFetch = async () => {
      const response = await fetch("/api/status");
      const data = await response.json();
      console.log(data);
    };

    testFetch();
  }, []);
  // useFetchJobs();

  return (
    <div className="homepage-wrapper">
      <div className="homepage-images">
        <div className="homepage-hero">
          <em className="homepage-hero-title">
            &quot;Connecting talent with opportunity&quot;
          </em>
        </div>
        <div className="homepage-search-wrapper">
          <Search source="home" />
        </div>
      </div>
      <div className="homepage-statement-wrapper">
        <h2>
          Welcome to Stellar Recruitment, where stars align with schools and
          educators! Whether you&apos;re a cover, supply, or classroom teacher,
          count on us to connect you with exceptional opportunities. Explore our
          website to discover how we can help you shine in your teaching career.
          Let&apos;s make an impact in education together!
        </h2>
      </div>
      <div className="homepage-divider-image" />
      <Jobs />
    </div>
  );
}
