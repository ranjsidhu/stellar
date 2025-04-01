"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteModal from "./DeleteModal";
import type { AdminConfigCardProps } from "@/app/types";

const { Meta } = Card;

export default function AdminConfigCard({
  title,
  description,
  route,
  table,
  refreshTableData,
}: Readonly<AdminConfigCardProps>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const router = useRouter();
  const id = route.split("/").pop()!;

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

  return (
    <Card style={{ width: 240, height: 150 }} actions={actions}>
      <Meta title={title} description={description} />
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        id={id}
        table={table}
        refreshTableData={refreshTableData}
      />
    </Card>
  );
}
