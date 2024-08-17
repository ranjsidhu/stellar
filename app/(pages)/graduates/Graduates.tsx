"use client";

import { Form, Input, Button, type FormProps } from "antd";
import instance from "../../utils/instance";
import styles from "./Graduates.module.css";

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
  try {
    await instance.post("/graduates", values);
  } catch (error) {
    alert("Failed to submit referral");
  }
};

export default function Graduates() {
  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={handleSubmit}
      scrollToFirstError
      className={styles.graduatesFormForm}
    >
      <Item
        label="Your Name"
        name="referrerName"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input autoComplete="given-name" />
      </Item>

      <Item
        label="Your Contact Number"
        name="referrerContactNumber"
        rules={[
          { required: true, message: "Please enter your contact number" },
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
        <Input type="email" />
      </Item>

      <br />
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.graduatesFormSubmitBtn}
        >
          Submit
        </Button>
      </Item>
    </Form>
  );
}
