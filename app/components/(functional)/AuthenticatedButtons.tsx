"use client";

import Link from "next/link";
import { Button } from "@/app/components";
import SignOut from "./SignOut";

interface AuthenticatedButtonsProps {
  role?: string;
}

export default function AuthenticatedButtons({
  role,
}: AuthenticatedButtonsProps) {
  return (
    <>
      {role === "Admin" && (
        <Link href="/admin">
          <Button type="primary">Admin</Button>
        </Link>
      )}
      <Link href="/profile">
        <Button type="primary">Profile</Button>
      </Link>
      <SignOut />
    </>
  );
}
