"use client";

import { useState } from "react";
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
import { LIGHT } from "@/app/assets";
import { NotificationType, RegisterType } from "@/app/types";
import styles from "./Register.module.css";

export default function Register() {
  const router = useRouter();
  const [formDob, setFormDob] = useState<Date | string | string[]>("");
  const { useNotification } = notification;
  const [api, contextHolder] = useNotification();

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

      response.json().then(() => {
        router.push("/");
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
    <div className={styles.registerWrapper}>
      {contextHolder}
      <Image
        src={LIGHT}
        priority
        alt="Letterhead image"
        className={styles.registerImage}
        onClick={() => router.push("/")}
      />
      <Form
        name="basic"
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
        className={styles.registerForm}
      >
        <div className={styles.registerFormFlex}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              placeholder="John"
              autoComplete="given-name"
              className={styles.loginFormTextInput}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              placeholder="Doe"
              className={styles.loginFormTextInput}
              autoComplete="family-name"
            />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dob"
            rules={[
              { required: true, message: "Please enter your date of birth" },
            ]}
          >
            <DatePicker
              className={styles.loginFormTextInput}
              onChange={onChange}
            />
          </Form.Item>
        </div>

        <div className={styles.registerFormFlex}>
          <Form.Item
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
              className={styles.loginFormTextInput}
              placeholder="123 Sesame Street"
            />
          </Form.Item>
          <Form.Item
            label="Town"
            name="town"
            rules={[{ required: true, message: "Please enter your town" }]}
          >
            <Input
              className={styles.loginFormTextInput}
              placeholder="Manhattan"
            />
          </Form.Item>
          <Form.Item
            label="Postcode"
            name="postcode"
            rules={[{ required: true, message: "Please enter your postcode" }]}
          >
            <Input
              className={styles.loginFormTextInput}
              placeholder="SW1A 2JL"
            />
          </Form.Item>
        </div>

        <div className={styles.registerFormFlex}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              placeholder="john.doe@example.com"
              className={styles.loginFormTextInput}
              autoComplete="email"
              type="email"
            />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input
              placeholder="07312 345 677"
              className={styles.loginFormTextInput}
              autoComplete="tel"
              type="text"
            />
          </Form.Item>
        </div>
        <div className={styles.registerFormFlex}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Password"
              className={styles.loginFormTextInput}
              autoComplete="new-password"
              type="password"
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className={styles.loginFormTextInput}
              autoComplete="new-password"
              type="password"
            />
          </Form.Item>
        </div>

        <Form.Item className={styles.registerFormSubmit}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
