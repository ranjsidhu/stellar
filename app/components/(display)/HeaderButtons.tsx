"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { AuthenticatedButtons, UnauthenticatedButtons } from "@/app/components";
import { getUserRole } from "@/app/utils/storage";

export default function HeaderButtons() {
  const { session } = useAppSelector((state) => state.Auth);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = getUserRole();
    setRole(userRole);
  }, []);

  return (
    <div className="h-[112px] w-full flex justify-end items-center gap-5">
      {session ? (
        <AuthenticatedButtons role={role} />
      ) : (
        <UnauthenticatedButtons />
      )}
    </div>
  );
}
