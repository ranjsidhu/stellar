"use client";

import { useEffect, useState } from "react";
import { Select, Form, FormProps, Typography, Button } from "antd";
import { notify, PageLayout, SectionLoading } from "@/app/components";
import { BasicTable, UserDocumentType } from "@/app/types";
import { getUserId } from "@/app/utils/storage";

export default function JobApply({
  id,
  status,
  title,
  description,
}: {
  id: string;
  status: BasicTable;
  title: string;
  description: string;
}) {
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Title, Paragraph, Text } = Typography;
  const [userDocuments, setUserDocuments] = useState<UserDocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await fetch(`/api/user_documents/${userId}`);
        const data = await response.json();
        setUserDocuments(data.response);
      } catch (error) {
        notify(
          "error",
          "Error",
          "An error occurred while fetching user documents"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDocuments();
  }, []);

  const handleSubmit: FormProps["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const user_id = getUserId();
      const checkResponse = await fetch(
        `/api/user_applications/${user_id}/${id}`
      );
      const checkData = await checkResponse.json();
      if (checkData.applied) {
        notify("warning", "Error", "You have already applied for this job");
        return;
      }

      fetch("/api/user_applications", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          user_id,
          job_id: Number(id),
          application_status_id: status.id,
        }),
      }).then((res) =>
        res.json().then(() => {
          notify("success", "Success", "Application submitted successfully!");
        })
      );
    } catch (error) {
      notify(
        "error",
        "Error",
        "An error occurred while sending the application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionLoading loading={loading}>
      <PageLayout>
        <Title level={1}>{title}</Title>
        <Paragraph>{description}</Paragraph>
        <Form form={form} onFinish={handleSubmit}>
          <Item
            label="CV"
            name="user_document_id"
            rules={[
              { required: true, message: "Please choose an academic level" },
            ]}
          >
            <Select
              placeholder="Please choose an academic level"
              disabled={!userDocuments.length}
              options={userDocuments.map((level) => ({
                ...level,
                value: level.id,
                label: level.filename,
              }))}
            />
          </Item>

          <div className="mb-4 mt-18">
            <Text type="secondary">
              Please ensure your profile is up to date with the correct
              information before submitting. Similarly, click Profile to add or
              delete documents.
            </Text>
          </div>

          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </PageLayout>
    </SectionLoading>
  );
}
