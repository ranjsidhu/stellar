"use client";

import { useRouter } from "next/navigation";
import { Card } from "antd";
import type { AdminCardProps } from "@/app/types";

const { Meta } = Card;

export default function AdminCard({
  title,
  description,
  route,
}: AdminCardProps) {
  const router = useRouter();

  return (
    <Card
      hoverable
      style={{ width: 240, height: 150 }}
      onClick={() => router.push(route)}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
