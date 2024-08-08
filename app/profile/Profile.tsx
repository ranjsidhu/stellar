"use client";

import { useEffect, useState } from "react";
import { User } from "../types";

export default function Profile() {
  const [details, setDetails] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user")!;
    const userDetails: User = JSON.parse(user);
    setDetails(userDetails);
  }, []);

  return (
    <>
      {details &&
        Object.entries(details).map(([key, value]) => (
          <div key={key}>
            {key}: {value?.toString()}
          </div>
        ))}
    </>
  );
}
