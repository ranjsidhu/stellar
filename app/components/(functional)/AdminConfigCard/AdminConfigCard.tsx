"use client";

import { useRouter } from "next/navigation";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { AdminCardProps } from "@/app/types";

const { Meta } = Card;

export default function AdminConfigCard({
  title,
  description,
  route,
}: AdminCardProps) {
  const router = useRouter();

  const actions: React.ReactNode[] = [
    <EditOutlined
      key="edit"
      onClick={() => {
        router.push(route);
      }}
    />,
    <DeleteOutlined key="delete" />,
  ];

  return (
    <Card style={{ width: 240, height: 150 }} actions={actions}>
      <Meta title={title} description={description} />
    </Card>
  );
}
