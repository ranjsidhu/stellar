"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { notify } from "@/app/components";
import type { AdminConfigCardProps } from "@/app/types";

const { Meta } = Card;

export default function AdminConfigCard({
  title,
  description,
  route,
  table,
  refreshTableData,
}: AdminConfigCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const router = useRouter();
  const id = route.split("/").pop();

  const actions: React.ReactNode[] = [
    <EditOutlined
      key="edit"
      style={{ color: "#00150f" }}
      onClick={() => router.push(`/admin/configuration/edit${route}`)}
    />,
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={() => setModalOpen(true)}
    />,
  ];

  const DeleteModal = () => {
    return (
      <Modal
        centered
        title="Are you sure?"
        okType="danger"
        okText="Yes"
        cancelText="No"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        confirmLoading={confirmLoading}
        onOk={() => {
          setConfirmLoading(true);
          fetch(`/api/${table}`, {
            method: "PUT",
            body: JSON.stringify({ id, is_deleted: true }),
          })
            .then(() => {
              notify(
                "success",
                "Success",
                "Configuration deleted successfully"
              );
              refreshTableData();
            })
            .catch((error: any) => notify("error", "Error", error.message))
            .finally(() => {
              setModalOpen(false);
              setConfirmLoading(false);
            });
        }}
      >
        <p>Do you want to delete this configuration?</p>
      </Modal>
    );
  };

  return (
    <Card style={{ width: 240, height: 150 }} actions={actions}>
      <Meta title={title} description={description} />
      <DeleteModal />
    </Card>
  );
}
