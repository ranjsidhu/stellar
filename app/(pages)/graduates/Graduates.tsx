"use client";

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  type FormProps,
  DatePicker,
  Select,
  Switch,
} from "antd";
import { UniLevelType } from "../../types";
import { notify } from "@/app/components";
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

export default function Graduates() {
  const [form] = Form.useForm();
  const [uniLevels, setUniLevels] = useState<UniLevelType[]>([]);

  useEffect(() => {
    const fetchUniLevels = async () => {
      try {
        fetch("/api/university_levels", { cache: "force-cache" })
          .then((res) => res.json())
          .then((data) => setUniLevels(data.response));
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchUniLevels();
  }, []);

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      fetch("/api/graduates", {
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
      }).then(() => {
        form.resetFields();
        notify("success", "Success", "Graduate query submitted successfully");
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
      className={styles.graduatesFormForm}
    >
      <Item
        label="Your Name"
        name="full_name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input autoComplete="given-name" />
      </Item>

      <Item
        label="Your Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input autoComplete="email" />
      </Item>

      <Item label="Your Contact Number" name="contact_number">
        <Input autoComplete="tel" />
      </Item>

      <Item
        label="Course"
        name="course"
        rules={[{ required: true, message: "Please enter your course" }]}
      >
        <Input />
      </Item>

      <Item
        label="Institution"
        name="institution"
        rules={[{ required: true, message: "Please enter your institution" }]}
      >
        <Input />
      </Item>

      <Item label="Course in progress?" name="in_progress">
        <Switch />
      </Item>

      <Item
        label="Estimated Completion Date"
        help="If you have graduated, please enter the date you graduated"
        name="estimated_completion_date"
        rules={[{ required: true }]}
      >
        <DatePicker className={styles.loginFormTextInput} />
      </Item>

      <br />

      <Item
        label="Academic Level"
        name="university_level_id"
        rules={[{ required: true, message: "Please choose an academic level" }]}
      >
        <Select
          placeholder="Please choose an academic level"
          options={uniLevels.map((level) => ({
            ...level,
            value: level.id,
            label: level.name,
          }))}
        />
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
