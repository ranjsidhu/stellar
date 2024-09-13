"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { clearSession } from "@/app/redux/features/Auth";
import { Button } from "@/app/components";

import styles from "./HeaderButtons.module.css";

export default function HeaderButtons() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.Auth);

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    dispatch(clearSession());
    window.location.reload();
    window.location.href = "/";
  };

  // TODO - add skeleton buttons to hide state hydration
  const AuthenticatedButtons = () => {
    return (
      <>
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
    <div className={styles.headerButtons}>
      {session ? <AuthenticatedButtons /> : <UnauthenticatedButtons />}
    </div>
  );
}
