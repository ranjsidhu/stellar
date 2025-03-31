"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { clearSession } from "@/app/redux/features/Auth";
import { Button } from "@/app/components";
import { AuthenticatedButtonsType } from "../types";

export default function AuthenticatedButtons({
  role,
}: Readonly<AuthenticatedButtonsType>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    dispatch(clearSession());
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <>
      {role === "Admin" && (
        <Button type="primary" onClick={() => router.push("/admin")}>
          Admin
        </Button>
      )}
      <Button type="primary" onClick={() => router.push("/profile")}>
        Profile
      </Button>
      <Button type="primary" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}
