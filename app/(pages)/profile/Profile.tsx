"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@/app/types";
import styles from "./Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user")!;
    const userDetails: User = JSON.parse(user);
    if (!userDetails?.id) {
      router.push("/login");
      return;
    }
    setDetails(userDetails);
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
