"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/app/redux/hooks";
import type { User } from "@/app/types";
import styles from "./Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<User | null>(null);
  const userDetails: User = useUser();

  useEffect(() => {
    if (!userDetails?.id) {
      router.push("/login");
      return;
    }
    setDetails(userDetails);
  }, [router, userDetails]);

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
