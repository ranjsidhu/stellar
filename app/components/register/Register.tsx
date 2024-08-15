"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Form,
  Button,
  Input,
  type FormProps,
  type DatePickerProps,
  notification,
  DatePicker,
} from "antd";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setAuthenticated } from "@/lib/features/Auth";
import { LIGHT } from "@/app/assets";
import { NotificationType, RegisterType } from "@/app/types";
import "./register.css";

const { Item } = Form;

export default function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formDob, setFormDob] = useState<Date | string | string[]>("");
  const { useNotification } = notification;
  const [api, contextHolder] = useNotification();
  const { authenticated } = useAppSelector((state) => state.Auth);

  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated, router, formDob]);

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

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setFormDob(dateString);
  };

  const handleSubmit: FormProps<RegisterType>["onFinish"] = async (values) => {
    if (values.password !== values.confirmPassword) {
      openNotification("error", "Error", "Passwords do not match");
      return;
    }
    try {
      let response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          phone_number: values.phone,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const json = await response.json();
        const { message } = json;
        throw new Error(message);
      }

      openNotification("info", "Registering", "Creating your user profile...");

      // Remove passwords
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, password, ...filteredValues } = values;
      response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ ...filteredValues, dob: formDob }),
      });

      if (!response.ok) {
        const json = await response.json();
        const { message } = json;
        throw new Error(message);
      }

      response.json().then((data) => {
        localStorage.setItem("user", JSON.stringify(data.response[0]));
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
            name="first_name"
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
            name="last_name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              placeholder="Doe"
              className="login-form-text-input"
              autoComplete="family-name"
            />
          </Item>

          <Item
            label="Date of birth"
            name="dob"
            rules={[
              { required: true, message: "Please enter your date of birth" },
            ]}
          >
            <DatePicker className="login-form-text-input" onChange={onChange} />
          </Item>
        </div>

        <div className="register-form-flex">
          <Item
            label="Address Line 1"
            name="first_line_address"
            rules={[
              {
                required: true,
                message: "Please enter the first line",
              },
            ]}
          >
            <Input
              className="login-form-text-input"
              placeholder="123 Sesame Street"
            />
          </Item>
          <Item
            label="Town"
            name="town"
            rules={[{ required: true, message: "Please enter your town" }]}
          >
            <Input className="login-form-text-input" placeholder="Manhattan" />
          </Item>
          <Item
            label="Postcode"
            name="postcode"
            rules={[{ required: true, message: "Please enter your postcode" }]}
          >
            <Input className="login-form-text-input" placeholder="SW1A 2JL" />
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
          <Item label="Phone Number" name="phone">
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
