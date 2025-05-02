"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { notify } from "@/app/components";
import "./fa.css";

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
    <div className="flex flex-col w-full opacity-100">
      <p className="text-white text-center p-2.5">
        Search current jobs for your next role
      </p>
      <div className="flex justify-center items-center h-full">
        <input
          placeholder={placeholder}
          className="border border-[#00150f] rounded-[20px] p-2.5 w-[55%] text-base"
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
        <button
          className="fa fa-search text-[#ffd700] hover:cursor-pointer"
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
