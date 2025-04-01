"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/app/redux/hooks";
import { setSession } from "@/app/redux/features/Auth";
import { Form, Input, Button, type FormProps } from "antd";
import { LIGHT } from "@/app/assets";
import { createClient } from "@/app/utils/supabase/client";
import { setItem } from "@/app/utils/storage";
import { notify } from "@/app/components";

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const RETURN_URL = params.get("return") ?? "";
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const forgotPassword = async () => {
    if (!email) {
      notify("error", "Error", "Please enter your email");
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
      notify(
        "success",
        "Success",
        "Password reset link has been sent to your email"
      );
    }
  };

  const handleSubmit: FormProps<{
    email: string;
    password: string;
  }>["onFinish"] = (values) => {
    setDisabled(true);
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ ...values }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        setItem("userDetails", data.user);
        dispatch(setSession(data.session));
        router.push(`${RETURN_URL}/`);
      })
      .catch((error) => {
        notify(
          "error",
          "Error",
          error.message || "An unexpected error occurred"
        );
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  // Custom styling for Ant Design components
  const inputStyle =
    "w-full md:w-80 py-3 px-4 rounded-md border-gray-300 hover:border-[#00150f] focus:border-[#00150f]";
  const loginBtnStyle =
    "w-full md:w-80 h-12 bg-[#00150f] hover:bg-[#00150f]/90 text-white hover:text-[#DAA520] border-none rounded-md font-medium transition-colors";
  const forgotBtnStyle =
    "w-full md:w-80 h-12 border border-gray-300 hover:border-[#00150f] text-gray-700 hover:text-[#00150f] rounded-md font-medium transition-colors";

  return (
    <div className="min-h-[80vh] w-full flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <button
          className="mb-12 transform hover:scale-105 transition-transform cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={LIGHT}
            priority
            alt="Stellar Recruitment Logo"
            height={120}
            className="w-auto"
          />
        </button>

        {/* Login Card */}
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-2 bg-[#DAA520]"></div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#00150f] mb-6 text-center">
              Login to Your Account
            </h2>

            <Form
              name="login_form"
              layout="vertical"
              onFinish={handleSubmit}
              scrollToFirstError
              className="w-full"
              requiredMark={false}
            >
              <Form.Item
                label={<span className="text-gray-700 font-medium">Email</span>}
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
                className="mb-4"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className={inputStyle}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Password</span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
                className="mb-6"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className={inputStyle}
                  onChange={() => setDisabled(false)}
                />
              </Form.Item>

              <Form.Item className="mb-3 flex justify-center">
                <Button
                  htmlType="submit"
                  type="primary"
                  className={loginBtnStyle}
                  disabled={disabled}
                  size="large"
                >
                  {disabled ? "Logging in..." : "Log In"}
                </Button>
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button
                  type="default"
                  className={forgotBtnStyle}
                  onClick={forgotPassword}
                  size="large"
                >
                  Forgot Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Help text */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Having trouble logging in? Please contact the{" "}
          <a
            href="mailto:admin@stellar-recruitment.co.uk"
            className="text-[#00150f] hover:text-[#DAA520]"
          >
            Admin team
          </a>
          {"."}
        </p>
      </div>
    </div>
  );
}
