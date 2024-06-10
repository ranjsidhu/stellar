"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchProps } from "@/app/constants/types.index";
import "./search.css";

export default function Search({ source }: SearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.push(`/jobs?search=${search}`);
      }
    };

    document.addEventListener("keydown", keydown);
  }, [router, search]);

  let placeholder = "";
  switch (source) {
    case "home":
      placeholder = "Search for a position...";
      break;
    default:
      placeholder = "Search for a position...";
      break;
  }

  return (
    <div className="search-wrapper">
      <p className="search-statement">Search current jobs for your next role</p>
      <div className="search-box">
        <input
          placeholder={placeholder}
          className="search-box-input"
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
        <i
          className="fa fa-search search-icon"
          onClick={() => router.push(`/jobs?search=${search}`)}
        />
      </div>
    </div>
  );
}
