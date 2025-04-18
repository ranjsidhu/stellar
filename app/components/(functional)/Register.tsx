"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  Button,
  Input,
  type FormProps,
  type DatePickerProps,
  DatePicker,
} from "antd";
import { LIGHT } from "@/app/assets";
import { RegisterType } from "@/app/types";
import { notify } from "@/app/components";

export default function Register() {
  const router = useRouter();
  const [formDob, setFormDob] = useState<Date | string | string[]>("");
  const [loading, setLoading] = useState(false);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setFormDob(dateString);
  };

  const handleSubmit: FormProps<RegisterType>["onFinish"] = (values) => {
    if (values.password !== values.confirmPassword) {
      notify("error", "Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone,
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message || "Registration failed");
          });
        }

        notify("info", "Registering", "Creating your user profile...");

        // Remove passwords
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, password, ...filteredValues } = values;

        return fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ ...filteredValues, dob: formDob }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message || "Profile creation failed");
          });
        }
        return response.json();
      })
      .then(() =>
        fetch("/api/signup-email", {
          method: "POST",
          body: JSON.stringify({
            name: `${values.first_name} ${values.last_name}`,
            email: values.email,
          }),
        })
      )
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        notify(
          "error",
          "Error",
          error.message || "An unexpected error occurred"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Custom styling for Ant Design components
  const inputStyle =
    "w-full rounded-md border-gray-300 hover:border-[#00150f] focus:border-[#00150f] py-2 px-3";
  const submitBtnStyle =
    "w-48 h-12 bg-[#00150f] hover:bg-[#00150f]/90 text-white hover:text-[#DAA520] border-none rounded-md font-medium transition-colors";

  return (
    <div className="w-full flex flex-col items-center py-12 px-4">
      {/* Logo */}
      <Link
        href="/"
        className="mb-10 transform hover:scale-105 transition-transform cursor-pointer"
      >
        <Image
          src={LIGHT}
          priority
          alt="Stellar Recruitment Logo"
          width={200}
          height={100}
          className="w-auto"
        />
      </Link>

      {/* Registration Card */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="h-2 bg-[#DAA520]"></div>
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#00150f] mb-6 text-center">
            Create Your Account
          </h2>

          <Form
            name="registration_form"
            layout="vertical"
            onFinish={handleSubmit}
            scrollToFirstError
            className="w-full"
            requiredMark={false}
          >
            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#00150f] mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      First Name
                    </span>
                  }
                  name="first_name"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input
                    placeholder="John"
                    autoComplete="given-name"
                    className={inputStyle}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Last Name</span>
                  }
                  name="last_name"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input
                    placeholder="Doe"
                    className={inputStyle}
                    autoComplete="family-name"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Date of Birth
                    </span>
                  }
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your date of birth",
                    },
                  ]}
                >
                  <DatePicker
                    className={`${inputStyle} w-full`}
                    onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#00150f] mb-4 pb-2 border-b border-gray-200">
                Address Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Address Line 1
                    </span>
                  }
                  name="first_line_address"
                  rules={[
                    { required: true, message: "Please enter the first line" },
                  ]}
                >
                  <Input
                    className={inputStyle}
                    placeholder="123 Sesame Street"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Town</span>
                  }
                  name="town"
                  rules={[
                    { required: true, message: "Please enter your town" },
                  ]}
                >
                  <Input className={inputStyle} placeholder="Manchester" />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Postcode</span>
                  }
                  name="postcode"
                  rules={[
                    { required: true, message: "Please enter your postcode" },
                  ]}
                >
                  <Input className={inputStyle} placeholder="M1 1AA" />
                </Form.Item>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#00150f] mb-4 pb-2 border-b border-gray-200">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Email</span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input
                    placeholder="john.doe@example.com"
                    className={inputStyle}
                    autoComplete="email"
                    type="email"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Phone Number
                    </span>
                  }
                  name="phone"
                >
                  <Input
                    placeholder="07312 345 677"
                    className={inputStyle}
                    autoComplete="tel"
                    type="text"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Security Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#00150f] mb-4 pb-2 border-b border-gray-200">
                Security Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Password</span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    placeholder="Create a secure password"
                    className={inputStyle}
                    autoComplete="new-password"
                    type="password"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Confirm Password
                    </span>
                  }
                  name="confirmPassword"
                  rules={[
                    { required: true, message: "Please confirm your password" },
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm your password"
                    className={inputStyle}
                    autoComplete="new-password"
                    type="password"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Submit Button */}
            <Form.Item className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className={submitBtnStyle}
                loading={loading}
                size="large"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Login link */}
      <p className="text-gray-700">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-[#00150f] hover:text-[#DAA520] font-medium transition-colors"
        >
          Log in here
        </button>
      </p>
    </div>
  );
}
