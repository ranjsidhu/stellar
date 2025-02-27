"use client";

import { useState } from "react";
import { Form, Input, Button, type FormProps } from "antd";
import { notify } from "@/app/components";

type FieldType = {
  name: string;
  contactNumber: string;
  friend: {
    name: string;
    job: string;
    phone: string;
    location?: string;
    email?: string;
  };
};

const { Item } = Form;

export default function Referrals() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      fetch("/api/referrals", {
        method: "POST",
        body: JSON.stringify(values),
      }).then(() => {
        form.resetFields();
        notify("success", "Success", "Referral submitted successfully");
        setLoading(false);
      });
    } catch (error: any) {
      notify("error", "Error", error.message);
      setLoading(false);
    }
  };

  // Custom styling for Ant Design components to match Tailwind theme
  const inputClassName =
    "rounded-md border-gray-300 hover:border-[#00150f] focus:border-[#00150f]";
  const submitBtnClassName =
    "bg-[#00150f] hover:bg-[#00150f]/90 text-white hover:text-[#DAA520] border-none rounded-md h-10 px-6 font-medium transition-colors";

  return (
    <Form
      form={form}
      name="referral_form"
      layout="vertical"
      onFinish={handleSubmit}
      scrollToFirstError
      className="w-full max-w-2xl mx-auto"
      requiredMark={false}
    >
      {/* Your Information Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-[#00150f] mb-4 pb-2 border-b border-gray-200">
          Your Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Item
            label="Your Name"
            name="referrerName"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-0"
          >
            <Input autoComplete="given-name" className={inputClassName} />
          </Item>

          <Item
            label="Your Contact Details"
            name="referrerContactNumber"
            rules={[
              { required: true, message: "Please enter your contact details" },
            ]}
            className="mb-0"
          >
            <Input
              autoComplete="tel"
              className={inputClassName}
              placeholder="Email or Phone"
            />
          </Item>
        </div>
      </div>

      {/* Friend's Information Section */}
      <div>
        <h4 className="text-lg font-semibold text-[#00150f] mb-4 pb-2 border-b border-gray-200">
          Friend&apos;s Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Item
            label="Friend's Name"
            name="referredFriendName"
            rules={[
              { required: true, message: "Please enter your friend's name" },
            ]}
            className="mb-0"
          >
            <Input className={inputClassName} />
          </Item>

          <Item
            label="Friend's Job Title"
            name="referredFriendJob"
            rules={[
              {
                required: true,
                message: "Please enter your friend's job title",
              },
            ]}
            className="mb-0"
          >
            <Input
              className={inputClassName}
              placeholder="E.g. Qualified Teacher, Teaching Assistant"
            />
          </Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Item
            label="Friend's Phone Number"
            name="referredFriendContactNumber"
            rules={[
              {
                required: true,
                message: "Please enter your friend's contact details",
              },
            ]}
            className="mb-0"
          >
            <Input className={inputClassName} />
          </Item>

          <Item
            label="Friend's Email"
            name="referredFriendEmail"
            rules={[
              { required: true, message: "Please enter your friend's email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
            className="mb-0"
          >
            <Input type="email" className={inputClassName} />
          </Item>
        </div>

        <div className="mt-6">
          <Item
            label="Friend's Location"
            name="referredFriendLocation"
            className="mb-0"
          >
            <Input
              className={inputClassName}
              placeholder="City or region (optional)"
            />
          </Item>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className={submitBtnClassName}
            loading={loading}
            size="large"
          >
            Submit Referral
          </Button>
        </Item>
        <p className="text-sm text-gray-500 mt-4">
          By submitting this form, you confirm you have your friend&apos;s
          permission to share their details with us.
        </p>
      </div>
    </Form>
  );
}
