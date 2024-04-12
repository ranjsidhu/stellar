"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import "./loading.css";

export default function Loading() {
  const { loading } = useAppSelector((state) => state.UI);

  useEffect(() => {
    if (!loading) return;
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="loading-wrapper">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
