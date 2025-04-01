"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Form } from "antd";
import { getItem } from "@/app/utils/storage";
import type { User } from "@/app/types";
import ViewProfile from "./ViewProfile";
import EditableProfile from "./EditableProfile";
import ProfileActions from "./ProfileActions";

export default function UserProfile() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [details, setDetails] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userDetails = getItem("userDetails");
    const parsedUserDetails: User | null = userDetails || null;
    if (parsedUserDetails) {
      const { id } = parsedUserDetails;
      const invalidDetails = !id || id === -1 || !parsedUserDetails?.roles;
      if (invalidDetails) {
        router.push("/login?return=profile");
        return;
      } else {
        setDetails(parsedUserDetails);
      }
    }
  }, [router]);

  if (!details) {
    return <>No user details available</>;
  }

  return (
    <Card
      className="shadow-xl"
      extra={
        <ProfileActions
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          form={form}
        />
      }
    >
      {isEditing ? (
        <EditableProfile
          details={details}
          form={form}
          setIsEditing={setIsEditing}
          setDetails={setDetails}
        />
      ) : (
        <ViewProfile details={details} />
      )}
    </Card>
  );
}
