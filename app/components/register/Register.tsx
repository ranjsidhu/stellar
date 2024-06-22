"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { Form, Input, Button, type FormProps, notification } from "antd";
import { LIGHT } from "@/app/assets";
import { NotificationType } from "@/app/types";
import "./register.css";

type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const router = useRouter();
  const { Item } = Form;
  const { useNotification } = notification;
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

  const handleSubmit: FormProps<RegisterType>["onFinish"] = async (values) => {
    if (values.password !== values.confirmPassword) {
      openNotification("error", "Error", "Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phoneNumber,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const json = await response.json();
        const { message } = json;
        throw new Error(message);
      }
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
    <div className="register-wrapper">
      {contextHolder}
      <Image
        src={LIGHT}
        priority
        alt="Letterhead image"
        className="register-image"
        onClick={() => router.push("/")}
      />
      <Form
        name="basic"
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
        className="register-form"
      >
        <div className="register-form-flex">
          <Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              placeholder="John"
              autoComplete="given-name"
              className="login-form-text-input"
            />
          </Item>

          <Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              placeholder="Doe"
              className="login-form-text-input"
              autoComplete="family-name"
            />
          </Item>
        </div>

        <div className="register-form-flex">
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              placeholder="john.doe@example.com"
              className="login-form-text-input"
              autoComplete="email"
              type="email"
            />
          </Item>
          <Item label="Phone Number" name="phoneNumber">
            <Input
              placeholder="07312 345 677"
              className="login-form-text-input"
              autoComplete="tel"
              type="text"
            />
          </Item>
        </div>

        <div className="register-form-flex">
          <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Password"
              className="login-form-text-input"
              autoComplete="new-password"
              type="password"
            />
          </Item>
          <Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="login-form-text-input"
              autoComplete="new-password"
              type="password"
            />
          </Item>
        </div>

        <Item className="register-form-submit">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Item>
      </Form>
    </div>
  );
}
