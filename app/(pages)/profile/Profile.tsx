"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItem } from "@/app/utils/storage";
import type { User } from "@/app/types";
import styles from "./Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<User | null>(null);

  useEffect(() => {
    const userDetails = getItem("userDetails");
    const parsedUserDetails: User | null = userDetails ? userDetails : null;
    if (!parsedUserDetails?.id || parsedUserDetails?.id === -1) {
      router.push("/login?return=profile");
      return;
    }
    setDetails(parsedUserDetails);
  }, [router]);

  return (
    <div className={styles.profileWrapper}>
      {details &&
        Object.entries(details).map(([key, value]) => (
          <div key={key}>
            {key}: {value?.toString()}
          </div>
        ))}
    </div>
  );
}
