"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { notify } from "@/app/components";
import styles from "./Search.module.css";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && pathname === "/") {
        router.push(`/jobs?search=${search}`);
      }
    };

    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [router, search, pathname]);

  let placeholder = "";
  placeholder = "Search for a position...";

  return (
    <div className={styles.searchWrapper}>
      <p className={styles.searchStatement}>
        Search current jobs for your next role
      </p>
      <div className={styles.searchBox}>
        <input
          placeholder={placeholder}
          className={styles.searchBoxInput}
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
        <button
          className={`fa fa-search ${styles.searchIcon}`}
          onClick={() => {
            if (!search) {
              notify("warning", "Warning", "Please enter a search term");
              return;
            }
            router.push(`/jobs?search=${search}`);
          }}
        />
      </div>
    </div>
  );
}
