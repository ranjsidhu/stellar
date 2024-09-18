"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItem } from "@/app/utils/storage";
import type { User } from "@/app/types";
import styles from "./Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<User | null>(null);
  const [role, setRole] = useState<String>("");

  useEffect(() => {
    const userDetails = getItem("userDetails");
    const parsedUserDetails: User | null = userDetails ? userDetails : null;
    const invalidDetails =
      !parsedUserDetails?.id ||
      parsedUserDetails?.id === -1 ||
      !parsedUserDetails?.roles;
    if (invalidDetails) {
      router.push("/login?return=profile");
      return;
    }
    setDetails(parsedUserDetails);
    setRole(parsedUserDetails.roles.name);
  }, [router]);

  return (
    <div className={styles.profileWrapper}>
      {!details && <div>Loading...</div>}
      {details && (
        <>
          {Object.entries(details)
            .filter((e) => e[0] !== "roles")
            .map(([key, value]) => (
              <div key={key}>
                {key}: {value?.toString()}
              </div>
            ))}
          <div>Role: {role}</div>
        </>
      )}
    </div>
  );
}
