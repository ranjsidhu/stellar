"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { clearSession, setAuthenticated } from "@/lib/features/Auth";
import { Button } from "@/app/components";
import styles from "./HeaderButtons.module.css";

type HeaderButtonsProps = {
  role: string | undefined | null;
};

export default function HeaderButtons({ role }: HeaderButtonsProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    dispatch(clearSession());
    dispatch(setAuthenticated(false));
    window.location.reload();
    window.location.href = "/";
  };

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
      {role === "authenticated" ? (
        <AuthenticatedButtons />
      ) : (
        <UnauthenticatedButtons />
      )}
    </div>
  );
}
