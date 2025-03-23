"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Input, Button, type FormProps } from "antd";
import { notify, PageLayout, SectionLoading } from "@/app/components";
import type { BasicTable } from "@/app/types";
import styles from "./AdminConfigEdit.module.css";

const initialEditData = {
  id: null,
  name: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export default function AdminConfigEdit({
  table,
  id,
}: Readonly<{
  table: string;
  id: number;
}>) {
  const [editData, setEditData] = useState<BasicTable>({
    ...initialEditData,
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { Item } = Form;

  useEffect(() => {
    const fetchEditData = async () => {
      if (!table || !id) {
        notify("error", "Error", "Table or ID not found");
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`/api/${table}/${id}`, {
          next: {
            tags: [table],
            revalidate: 600,
          },
        });
        const data = await response.json();
        setEditData(data.response[0]);
      } catch (error: any) {
        notify("error", "Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEditData();
  }, [id, table]);

  const handleSubmit: FormProps<BasicTable>["onFinish"] = (values) => {
    try {
      setLoading(true);
      fetch(`/api/${table}`, {
        method: "PUT",
        body: JSON.stringify({ ...values, id }),
      })
        .then(() => notify("success", "Success", "Record updated successfully"))
        .catch((error: any) => notify("error", "Error", error.message))
        .finally(() => {
          setLoading(false);
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
            <Input placeholder={editData.name} disabled={!editData.name} />
          </Item>
          <div className={styles.flexButtons}>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!editData.name}
              >
                Save
              </Button>
            </Item>
            <Item>
              <Button disabled={!editData.name} onClick={() => router.back()}>
                Cancel
              </Button>
            </Item>
          </div>
        </Form>
      </SectionLoading>
    </PageLayout>
  );
}
