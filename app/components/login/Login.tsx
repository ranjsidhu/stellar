"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { Form, Input, Button, type FormProps, notification } from "antd";
import { LIGHT } from "@/app/assets";
import { NotificationType } from "@/app/types";
import "./login.css";

const { Item } = Form;

export default function Login() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { authenticated } = useAppSelector((state) => state.Auth);

  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

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

  const handleSubmit: FormProps<{
    email: string;
    password: string;
  }>["onFinish"] = async (values) => {
    const { email } = values;

    setDisabled(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const json = await response.json();
        const { message } = json;
        throw new Error(message);
      }

      openNotification(
        "success",
        "Magic Link sent",
        "Please check your email for a link to login"
      );
    } catch (error: any) {
      if (error.message) {
        openNotification(
          "error",
          "Error",
          error.message || "An error occurred"
        );
      } else {
        openNotification(
          "error",
          "Error",
          error.message || "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <div className="login-wrapper">
      {contextHolder}
      <Image
        src={LIGHT}
        priority
        alt="Letterhead image"
        className="login-image"
        onClick={() => router.push("/")}
      />
      <Form
        name="basic"
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
        className="login-form"
      >
        <div className="login-form-input">
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              type="email"
              placeholder="Email"
              className="login-form-text-input"
            />
          </Item>
        </div>

        <Item className="login-form-submit">
          <Button
            htmlType="submit"
            type="primary"
            className="login-form-text-input"
            disabled={disabled}
          >
            Login
          </Button>
        </Item>
      </Form>
    </div>
  );
}
