"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Input, Button, type FormProps } from "antd";
import { Letterhead } from "@/app/assets";
import instance from "@/app/utils/instance";
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
  const { Item } = Form;
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit: FormProps<RegisterType>["onFinish"] = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await instance.post("/auth/register", {
        ...values,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
          },
        },
      });
      router.push("/");
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-wrapper">
      <Image
        src={Letterhead}
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
        {error && <div className="register-form-error">{error}</div>}
        <div className="register-form-flex">
          <Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input autoComplete="given-name" />
          </Item>

          <Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input autoComplete="family-name" />
          </Item>
        </div>
        <div className="register-form-flex">
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input autoComplete="email" type="email" />
          </Item>
          <Item label="Phone Number" name="phoneNumber">
            <Input autoComplete="tel" type="text" />
          </Item>
        </div>
        <div className="register-form-flex">
          <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input autoComplete="new-password" type="password" />
          </Item>
          <Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input type="password" />
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
