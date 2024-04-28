"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Input, Button, type FormProps } from "antd";
import { Letterhead } from "@/app/assets";
import instance from "@/app/utils/instance";
import "./login.css";

export default function Login() {
  const { Item } = Form;
  const router = useRouter();
  const type = useSearchParams().get("type");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type) router.push("/");
  }, [type, router]);

  const errorHandle = () => {
    return true;
  };

  const handleSubmit: FormProps<{
    email: string;
    password: string;
  }>["onFinish"] = async (values) => {
    const { email, password } = values;
    if (errorHandle()) {
      setError("Invalid email or password");
      return;
    }

    try {
      const res = await instance.post("/login", { type, email, password });
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
