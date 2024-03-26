"use client";

import { useState } from "react";
import { SearchProps } from "@/app/constants/types.index";
import "./search.css";

export default function Search({ source }: SearchProps) {
  const [search, setSearch] = useState("");

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
          onClick={() => console.log(search)}
        />
      </div>
    </div>
  );
}
