"use client";

import { useState } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { WithdrawModalProps } from "@/app/types";
import { notify } from "@/app/components";

export default function WithdrawModal({
  application,
  isModalOpen,
  setIsModalOpen,
}: Readonly<WithdrawModalProps>) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onOk = () => {
    setConfirmLoading(true);
    fetch(`/api/user_applications/withdraw`, {
      method: "PUT",
      body: JSON.stringify({ id: application.id }),
    })
      .then(() =>
        notify("success", "Success", "Application withdrawn successfully")
      )
      .catch((error: any) => notify("error", "Error", error.message))
      .finally(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      centered
      title={
        <div className="flex items-center gap-2">
          <ExclamationCircleOutlined className="text-red-500" />
          <span>Withdraw Application</span>
        </div>
      }
      open={isModalOpen}
      confirmLoading={confirmLoading}
      onOk={onOk}
      onCancel={() => setIsModalOpen(false)}
      okText="Yes, withdraw"
      cancelText="No, keep it"
      okButtonProps={{ danger: true }}
    >
      <p>
        Are you sure you want to withdraw this application? This action cannot
        be undone.
      </p>
    </Modal>
  );
}
