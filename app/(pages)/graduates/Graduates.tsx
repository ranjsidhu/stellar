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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      fetch("/api/graduates", {
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
      }).then(() => {
        form.resetFields();
        notify("success", "Success", "Graduate query submitted successfully");
        setLoading(false);
      });
    } catch (error: any) {
      console.error(error.message);
      notify("error", "Error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClassName =
    "rounded-md border-gray-300 hover:border-[#00150f] focus:border-[#00150f]";
  const submitBtnClassName =
    "bg-[#00150f] hover:bg-[#00150f]/90 text-white hover:text-[#DAA520] border-none rounded-md h-10 px-6 font-medium transition-colors";

  return (
    <Form
      form={form}
      name="graduate_application"
      layout="vertical"
      onFinish={handleSubmit}
      scrollToFirstError
      className="w-full max-w-2xl mx-auto"
      requiredMark={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Item
          label="Your Name"
          name="full_name"
          rules={[{ required: true, message: "Please enter your name" }]}
          className="mb-0"
        >
          <Input autoComplete="given-name" className={inputClassName} />
        </Item>

        <Item
          label="Your Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          className="mb-0"
        >
          <Input autoComplete="email" className={inputClassName} />
        </Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Item
          label="Your Contact Number"
          name="contact_number"
          className="mb-0"
        >
          <Input autoComplete="tel" className={inputClassName} />
        </Item>

        <Item
          label="Institution"
          name="institution"
          rules={[{ required: true, message: "Please enter your institution" }]}
          className="mb-0"
        >
          <Input className={inputClassName} />
        </Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Item
          label="Course"
          name="course"
          rules={[{ required: true, message: "Please enter your course" }]}
          className="mb-0"
        >
          <Input className={inputClassName} />
        </Item>

        <Item
          label="Academic Level"
          name="university_level_id"
          rules={[
            { required: true, message: "Please choose an academic level" },
          ]}
          className="mb-0"
        >
          <Select
            placeholder="Please choose an academic level"
            options={uniLevels.map((level) => ({
              ...level,
              value: level.id,
              label: level.name,
            }))}
            className={inputClassName}
          />
        </Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Item
          label="Estimated Completion Date"
          help="If you have graduated, please enter the date you graduated"
          name="estimated_completion_date"
          rules={[{ required: true, message: "Please select a date" }]}
          className="mb-0"
        >
          <DatePicker className={`${inputClassName} w-full`} />
        </Item>

        <Item
          label="Course in progress?"
          name="in_progress"
          valuePropName="checked"
          className="mb-0"
        >
          <div className="flex items-center h-full pt-2">
            <Switch
              className="bg-gray-300"
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
            <span className="ml-2 text-gray-600 text-sm">
              Toggle if you&apos;re still studying
            </span>
          </div>
        </Item>
      </div>

      <div className="mt-8 text-center">
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className={submitBtnClassName}
            loading={loading}
            size="large"
          >
            Submit Application
          </Button>
        </Item>
      </div>
    </Form>
  );
}
