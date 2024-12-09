"use client";

import { Form, Input, Button, type FormProps } from "antd";
import { notify } from "@/app/components";
import styles from "./Referrals.module.css";

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

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      fetch("/api/referrals", {
        method: "POST",
        body: JSON.stringify(values),
      }).then(() => {
        form.resetFields();
        notify("success", "Success", "Referral submitted successfully");
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      onFinish={handleSubmit}
      scrollToFirstError
      className={styles.referralsFormForm}
    >
      <Item
        label="Your Name"
        name="referrerName"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input autoComplete="given-name" />
      </Item>

      <Item
        label="Your Contact Details (Email or Phone)"
        name="referrerContactNumber"
        rules={[
          { required: true, message: "Please enter your contact details" },
        ]}
      >
        <Input autoComplete="tel" />
      </Item>

      <Item
        label="Friend's Name"
        name="referredFriendName"
        rules={[{ required: true, message: "Please enter your friend's name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Friend's Job Title"
        name="referredFriendJob"
        rules={[
          { required: true, message: "Please enter your friend's job title" },
        ]}
      >
        <Input placeholder="E.g. Qualified Teacher, Teaching Assistant, Caretaker" />
      </Item>

      <Item
        label="Friend's Contact Details (Email or Phone)"
        name="referredFriendContactNumber"
        rules={[
          {
            required: true,
            message: "Please enter your friend's contact details",
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Friend's Email"
        name="referredFriendEmail"
        rules={[
          { required: true, message: "Please enter your friend's job title" },
        ]}
      >
        <Input type="email" />
      </Item>

      <Item label="Friend's Location" name="referredFriendLocation">
        <Input />
      </Item>

      <br />
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.referralsFormSubmitBtn}
        >
          Submit
        </Button>
      </Item>
    </Form>
  );
}
