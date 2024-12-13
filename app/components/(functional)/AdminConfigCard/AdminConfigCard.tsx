"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { notify } from "@/app/components";
import type { AdminCardProps } from "@/app/types";

const { Meta } = Card;

export default function AdminConfigCard({
  title,
  description,
  route,
}: AdminCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const actions: React.ReactNode[] = [
    <EditOutlined
      key="edit"
      style={{ color: "#00150f" }}
      onClick={() => router.push(`/admin/configuration/edit${route}`)}
    />,
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      // TODO - implement this once antd have resolved react 19 compliance
      // onClick={() => setModalOpen(true)}
      onClick={() =>
        notify("info", "Info", "Delete functionality is not available")
      }
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
        onClose={() => setModalOpen(false)}
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
