"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, type FormProps } from "antd";
import { PageLayout, SectionLoading, notify } from "@/app/components";
import { BasicTable } from "@/app/types";
import styles from "./AdminConfigAdd.module.css";

export default function AdminConfigAdd({ table }: { table: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { Item } = Form;
  const router = useRouter();

  const handleSubmit: FormProps<BasicTable>["onFinish"] = (values) => {
    try {
      setLoading(true);
      fetch(`/api/${table}`, {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then(() => notify("success", "Success", "Record created successfully"))
        .catch((error: any) => notify("error", "Error", error.message))
        .finally(() => {
          setLoading(false);
          router.back();
        });
    } catch (error: any) {
      notify("error", "Error", error.message);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <SectionLoading loading={loading}>
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError
          onFinish={handleSubmit}
        >
          <Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Input placeholder="Name of record" disabled={loading} />
          </Item>
          <div className={styles.flexButtons}>
            <Item>
              <Button type="primary" htmlType="submit" disabled={loading}>
                Save
              </Button>
            </Item>
            <Item>
              <Button disabled={loading} onClick={() => router.back()}>
                Cancel
              </Button>
            </Item>
          </div>
        </Form>
      </SectionLoading>
    </PageLayout>
  );
}
