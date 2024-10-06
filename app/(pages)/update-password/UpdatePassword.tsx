"use client";

import { Form, Input, Button, type FormProps } from "antd";
import { createClient } from "../../utils/supabase/client";
import { notify } from "@/app/components";
import styles from "./UpdatePassword.module.css";

const { Item } = Form;

export default function UpdatePassword() {
  const handleUpdatePassword: FormProps<{
    newPassword: string;
    confirmNewPassword: string;
  }>["onFinish"] = async (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      notify("error", "Error", "Passwords do not match");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });
    if (!error) {
      notify("success", "Success", "Password updated successfully");
    } else {
      notify("error", "Error", error.message);
    }
  };

  return (
    <div className={styles.updatePasswordWrapper}>
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
