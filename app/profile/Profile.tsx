"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "../types";
import "./profile.css";

export default function Profile() {
  const router = useRouter();
  const [details, setDetails] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user")!;
    const userDetails: User = JSON.parse(user);
    if (!userDetails.id) {
      router.push("/login");
    }
    setDetails(userDetails);
  }, [router]);

  return (
    <div className="profile-wrapper">
      <Avatar size={64} icon={<UserOutlined />} />
      {details &&
        Object.entries(details).map(([key, value]) => (
          <div key={key}>
            {key}: {value?.toString()}
          </div>
        ))}
    </div>
  );
}
