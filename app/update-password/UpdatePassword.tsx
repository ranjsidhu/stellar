"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Form, Input, Button, type FormProps, notification } from "antd";
import { createClient } from "../utils/supabase/client";
import { NotificationType } from "../types";
import "./update-password.css";

const { Item } = Form;

export default function UpdatePassword() {
  const router = useRouter();
  // TODO - if not authenticated redirect to home
  const { authenticated } = useAppSelector((state) => state.Auth);
  const { useNotification } = notification;
  const [api, contextHolder] = useNotification();

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const handleUpdatePassword: FormProps<{
    newPassword: string;
    confirmNewPassword: string;
  }>["onFinish"] = async (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      openNotification("error", "Error", "Passwords do not match");
      return;
    }
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });
    if (!error) {
      openNotification("success", "Success", "Password updated successfully");
    } else {
      openNotification("error", "Error", error.message);
    }
  };

  return (
    <div className="update-password-wrapper">
      {contextHolder}
      <Form
        name="basic"
        layout="vertical"
        className="update-password-form"
        onFinish={handleUpdatePassword}
        scrollToFirstError
      >
        <Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter a pasword" }]}
        >
          <Input.Password
            type="password"
            placeholder="New Password"
            className="login-form-text-input"
          />
        </Item>
        <Item
          label="Confirm New Password"
          name="confirmNewPassword"
          rules={[{ required: true, message: "Please enter a pasword" }]}
        >
          <Input.Password
            type="password"
            placeholder="New Password"
            className="login-form-text-input"
          />
        </Item>

        <Item className="login-form-submit">
          <Button
            htmlType="submit"
            type="primary"
            className="login-form-text-input"
          >
            Update Password
          </Button>
        </Item>
      </Form>
    </div>
  );
}
