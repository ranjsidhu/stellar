"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Input, Button, type FormProps } from "antd";
import { Letterhead } from "@/app/assets";
import instance from "@/app/utils/instance";
import "./login.css";

export default function Login() {
  const { Item } = Form;
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit: FormProps<{
    email: string;
    password: string;
  }>["onFinish"] = async (values) => {
    const { email, password } = values;

    try {
      const res = await instance.post("/login", { email, password });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <Image
        src={Letterhead}
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
        {error && <div className="login-form-error">{error}</div>}

        <div className="login-form-input">
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Email" />
          </Item>

          <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input type="password" placeholder="Password" />
          </Item>
        </div>

        <Item className="login-form-submit">
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Item>
      </Form>
    </div>
  );
}
