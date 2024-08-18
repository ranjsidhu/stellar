"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { setAuthenticated } from "@/app/redux/features/Auth";
import { Form, Input, Button, type FormProps, notification } from "antd";
import { LIGHT } from "@/app/assets";
import { NotificationType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import styles from "./Login.module.css";

const { Item } = Form;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

      response.json().then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setAuthenticated(true));
        router.push("/?authenticated=true");
      });
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
    <div className={styles.loginWrapper}>
      {contextHolder}
      <Image
        src={LIGHT}
        priority
        alt="Letterhead image"
        className={styles.loginImage}
        onClick={() => router.push("/")}
      />
      <Form
        name="basic"
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
        className={styles.loginForm}
      >
        <div className={styles.loginFormInput}>
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              type="email"
              placeholder="Email"
              className={styles.loginFormTextInput}
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
              className={styles.loginFormTextInput}
              onChange={() => setDisabled(false)}
            />
          </Item>
        </div>

        <Item>
          <Button
            htmlType="submit"
            type="primary"
            className={styles.loginFormTextInput}
            disabled={disabled}
          >
            Login
          </Button>
        </Item>

        <Item>
          <Button
            type="default"
            className={styles.loginFormTextInput}
            onClick={forgotPassword}
          >
            Forgot Password
          </Button>
        </Item>
      </Form>
    </div>
  );
}
