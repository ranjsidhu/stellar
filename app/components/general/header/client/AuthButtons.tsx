"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearSession } from "@/lib/features/Auth";
import Link from "next/link";

export default function AuthButtons({
  authenticated,
}: {
  authenticated: boolean;
}) {
  const dispatch = useAppDispatch();

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" }).then(() => {
      dispatch(clearSession);
    });
  };

  return (
    <>
      {authenticated ? (
        <button className="header-button" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <Link href="/login" className="header-button">
          Login
        </Link>
      )}
    </>
  );
}
