"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { clearSession } from "@/app/redux/features/Auth";
import { Button } from "@/app/components";
import { getUserRole } from "@/app/utils/storage";

export default function HeaderButtons() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.Auth);
  const [role, setRole] = useState("");

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    dispatch(clearSession());
    window.location.reload();
    window.location.href = "/";
  };

  useEffect(() => {
    const userRole = getUserRole();
    setRole(userRole);
  }, []);

  const AuthenticatedButtons = () => {
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
  };

  const UnauthenticatedButtons = () => {
    return (
      <>
        <Button type="primary" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button type="primary" onClick={() => router.push("/register")}>
          Register
        </Button>
      </>
    );
  };

  return (
    <div className="h-[112px] w-full flex justify-end items-center gap-5">
      {session ? <AuthenticatedButtons /> : <UnauthenticatedButtons />}
    </div>
  );
}
