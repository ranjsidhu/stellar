import {
  Form,
  Input,
  DatePicker,
  Space,
  Avatar,
  Divider,
  FormProps,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notify } from "@/app/components";
import { getItem, setItem } from "@/app/utils/storage";
import type { EditableProfileProps, User } from "@/app/types";

export default function EditableProfile({
  details,
  form,
  setDetails,
  setIsEditing,
}: Readonly<EditableProfileProps>) {
  const handleSubmit: FormProps<User>["onFinish"] = (values) => {
    try {
      fetch(`/api/users/${details.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          notify("success", "Success", "Profile updated successfully");
          const oldDetails = getItem("userDetails");
          const updatedDetails = { ...oldDetails, ...values };
          setItem("userDetails", updatedDetails);
          setDetails(updatedDetails);
        } else {
          throw new Error("Failed to update profile");
        }
      });
    } catch (error: any) {
      notify("error", "Error", error.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ ...details, dob: dayjs(details.dob) }}
      onFinish={handleSubmit}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4">
          <Avatar
            size={96}
            icon={<UserOutlined style={{ color: "#00150f" }} />}
            style={{ backgroundColor: "gold", fontSize: "48px" }}
          />
        </div>
        <Space>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input />
          </Form.Item>
        </Space>
      </div>
      <Divider style={{ borderColor: "#00150f" }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: "Date of birth is required" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="first_line_address"
          label="Address Line 1"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="town"
          label="Town"
          rules={[{ required: true, message: "Town is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="postcode"
          label="Postcode"
          rules={[{ required: true, message: "Postcode is required" }]}
        >
          <Input />
        </Form.Item>
      </div>
    </Form>
  );
}
