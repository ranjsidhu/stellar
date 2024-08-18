"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux/hooks";

export default function Redirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { authenticated } = useAppSelector((state) => state.Auth);

  useEffect(() => {
    // If already logged in, redirect to home page
    if ((pathname === "/login" || pathname === "/register") && authenticated) {
      router.push("/");
    }
  }, [router, pathname, authenticated]);
  return <></>;
}
