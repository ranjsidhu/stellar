"use client";

import { Button } from "@/app/components";
import { signOutAction } from "./serveractions";

export default function SignOut() {
  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <Button type="primary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
