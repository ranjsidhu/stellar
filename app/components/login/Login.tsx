"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { Form, Input, Button, type FormProps, notification } from "antd";
import { LIGHT } from "@/app/assets";
import { NotificationType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import "./login.css";

const { Item } = Form;

export default function Login() {
  const router = useRouter();
  const { useNotification } = notification;
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [api, contextHolder] = useNotification();
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

  const forgotPassword = async () => {
    if (!email) {
      openNotification("error", "Error", "Please enter your email");
      return;
    }
    const supabase = createClient();
    const redirectTo =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/update-password"
        : "https://stellar-recruitment.co.uk/update-password";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (!error) {
      openNotification(
        "success",
        "Success",
        "Password reset link has been sent to your email"
      );
    }
  };

  const handleSubmit: FormProps<{
    email: string;
    password: string;
  }>["onFinish"] = async (values) => {
    setDisabled(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        const json = await response.json();
        const { message } = json;
        throw new Error(message);
      }

      router.push("/?authenticated=true");
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </Item>
          <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your pasword" }]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              className="login-form-text-input"
              onChange={() => setDisabled(false)}
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

        <Item>
          <Button
            type="default"
            className="login-form-text-input"
            onClick={forgotPassword}
          >
            Forgot Password
          </Button>
        </Item>
      </Form>
    </div>
  );
}
