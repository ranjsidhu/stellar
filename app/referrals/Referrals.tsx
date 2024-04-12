"use client";

import { useState } from "react";
import { Form, Input, Button, type FormProps } from "antd";
import instance from "../utils/instance";
import "./referrals.css";

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

const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
  console.log(values);
};

export default function Referrals() {
  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={handleSubmit}
      scrollToFirstError
      className="referrals-form-form"
    >
      <Item
        label="Your Name"
        name="referrerName"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Your Contact Number"
        name="referrerContactNumber"
        rules={[
          { required: true, message: "Please enter your contact number" },
        ]}
      >
        <Input />
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
        label="Friend's Contact Number"
        name="referredFriendContactNumber"
        rules={[
          {
            required: true,
            message: "Please enter your friend's contact number",
          },
        ]}
      >
        <Input />
      </Item>

      <Item label="Friend's Location" name="referredFriendLocation">
        <Input />
      </Item>

      <Item label="Friend's Email" name="referredFriendEmail">
        <Input />
      </Item>

      <br />
      <Item  className="referrals-form-submit">
        <Button
          type="primary"
          htmlType="submit"
         
        >
          Submit
        </Button>
      </Item>
    </Form>
  );
}
