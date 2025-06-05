"use client";

import { useEffect, useState } from "react";
import { Card, Form } from "antd";
import type { User } from "@/app/types";
import ViewProfile from "./ViewProfile";
import EditableProfile from "./EditableProfile";
import ProfileActions from "./ProfileActions";
import { useSession } from "next-auth/react";
import { getUserDetails } from "./serveractions";

export default function UserProfile() {
  const [form] = Form.useForm();
  const [details, setDetails] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const findAndSetUserDetails = async () => {
      if (!session?.user?.email) return;
      const userDetails = await getUserDetails(session?.user?.email);
      setDetails(userDetails);
      setIsLoading(false);
    };
    findAndSetUserDetails();
  }, [session?.user?.email]);

  if (isLoading) {
    return <>Loading...</>;
  }

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
