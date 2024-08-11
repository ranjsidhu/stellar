"use client";

import { Form, Input, Button, type FormProps, notification } from "antd";
import { createClient } from "../../utils/supabase/client";
import { NotificationType } from "../../types";
import styles from "./UpdatePassword.module.css";

const { Item } = Form;

export default function UpdatePassword() {
  const { useNotification } = notification;
  const [api, contextHolder] = useNotification();

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const handleUpdatePassword: FormProps<{
    newPassword: string;
    confirmNewPassword: string;
  }>["onFinish"] = async (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      openNotification("error", "Error", "Passwords do not match");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });
    if (!error) {
      openNotification("success", "Success", "Password updated successfully");
    } else {
      openNotification("error", "Error", error.message);
    }
  };

  return (
    <div className={styles.updatePasswordWrapper}>
      {contextHolder}
      <Form
        name="basic"
        layout="vertical"
        className={styles.updatePasswordForm}
        onFinish={handleUpdatePassword}
        scrollToFirstError
      >
        <Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter a pasword" }]}
        >
          <Input.Password
            type="password"
            placeholder="New Password"
            className={styles.updatePasswordFormTextInput}
          />
        </Item>
        <Item
          label="Confirm New Password"
          name="confirmNewPassword"
          rules={[{ required: true, message: "Please enter a pasword" }]}
        >
          <Input.Password
            type="password"
            placeholder="New Password"
            className={styles.updatePasswordFormTextInput}
          />
        </Item>

        <Item>
          <Button
            htmlType="submit"
            type="primary"
            className={styles.updatePasswordFormTextInput}
          >
            Update Password
          </Button>
        </Item>
      </Form>
    </div>
  );
}
