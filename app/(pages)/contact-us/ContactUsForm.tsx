"use client";

import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { notify } from "@/app/components";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsForm(): React.ReactElement {
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: ContactFormValues): Promise<void> => {
    setLoading(true);
    try {
      await fetch("/api/contact-us", {
        method: "POST",
        body: JSON.stringify(values),
      });

      notify("success", "Message sent", "We will get back to you soon!");
      form.resetFields();
    } catch (error: any) {
      console.error(error);
      notify("error", "An error occurred", "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (): void => {
    notify(
      "error",
      "Please check your information and try again.",
      "Ensure all required values are filled"
    );
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#DAA520" }} spin />
  );

  return (
    <Form<ContactFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="space-y-4"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input className="rounded-md" disabled={loading} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input className="rounded-md" disabled={loading} />
      </Form.Item>

      <Form.Item
        label="Subject"
        name="subject"
        rules={[{ required: true, message: "Please enter a subject" }]}
      >
        <Input className="rounded-md" disabled={loading} />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: "Please enter your message" }]}
      >
        <TextArea rows={4} className="rounded-md" disabled={loading} />
      </Form.Item>

      <Form.Item className="pt-2">
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-10 bg-[#00150f] hover:bg-[#00150f]/90"
          style={{ height: "auto", padding: "0.75rem 1.5rem" }}
          loading={loading}
          icon={loading ? <Spin indicator={antIcon} /> : null}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </Form.Item>
    </Form>
  );
}
