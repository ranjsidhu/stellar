"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SectionLoading, notify } from "@/app/components";
import { Job, AdminJob } from "@/app/types";
import {
  Form,
  Input,
  Switch,
  Card,
  Button,
  Typography,
  Space,
  Row,
  Col,
  FormProps,
  Select,
} from "antd";
import { updateJob } from "./serveractions";

const { TextArea } = Input;
const { Title } = Typography;

export default function AdminJobEdit({ job, jobStatuses }: AdminJob) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit: FormProps<Job>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const result = await updateJob(job.reference_number, values);
      if (result.success) {
        notify("success", "Job Updated", "Job has been updated");
      } else {
        notify("error", "Failed to update job", result.error);
      }
    } catch (error: any) {
      notify("error", "Failed to update job", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionLoading loading={loading}>
      <div className="container mx-auto p-4 max-w-4xl">
        <Card>
          <Title level={2} className="mb-6">
            Edit Job Posting
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
            initialValues={job}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="role_name"
                  label="Role Name"
                  rules={[
                    { required: true, message: "Please enter the role name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    { required: true, message: "Please enter the location" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="salary_range"
                  label="Salary Range"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the salary range",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="status_id"
                  label="Status"
                  rules={[
                    { required: true, message: "Please select a status" },
                  ]}
                >
                  <Select>
                    {jobStatuses.map((status) => (
                      <Select.Option key={status.id} value={status.id}>
                        {status.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter the job description" },
              ]}
            >
              <TextArea rows={6} />
            </Form.Item>

            <Form.Item
              name="is_deleted"
              valuePropName="checked"
              className="mb-6"
            >
              <Space align="center">
                <Switch />
                <span>Mark as Deleted</span>
              </Space>
            </Form.Item>

            <Row>
              <Col span={24}>
                <div className="flex justify-end space-x-4">
                  <Button onClick={() => router.back()}>Cancel</Button>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </div>
              </Col>
            </Row>

            {isMounted && (
              <div className="text-sm text-gray-500 mt-4">
                <p>Created: {new Date(job.created_at).toLocaleString()}</p>
                <p>Last Updated: {new Date(job.updated_at).toLocaleString()}</p>
              </div>
            )}
          </Form>
        </Card>
      </div>
      {/* Applications */}
      <div className="container mx-auto p-4 max-w-4xl">
        <Card>
          <Title level={2} className="mb-6">
            Job Applications
          </Title>
          {job.user_applications.length ? (
            <div className="space-y-4">
              {job.user_applications.map((application) => (
                <Card
                  key={application.users.id}
                  size="small"
                  className="bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">
                        {application.users.first_name}{" "}
                        {application.users.last_name}
                      </span>
                    </div>
                    <div>
                      {/* <Button
                        type="link"
                        onClick={() =>
                          router.push(
                            `/admin/applications/${application.users.id}`
                          )
                        }
                      >
                        View Application
                      </Button> */}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              No applications received yet
            </div>
          )}
        </Card>
      </div>
    </SectionLoading>
  );
}
