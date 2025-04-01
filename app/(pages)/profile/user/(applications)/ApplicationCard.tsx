"use client";

import { useRouter } from "next/navigation";
import { Card, Button, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ApplicationCardProps } from "@/app/types";
import { getStatusColor } from "@/app/constants";
import WithdrawModal from "./WithdrawModal";

dayjs.extend(relativeTime);

export default function ApplicationCard({
  application,
  onWithdraw,
  isModalOpen,
  setIsModalOpen,
}: Readonly<ApplicationCardProps>) {
  const router = useRouter();
  const canWithdraw =
    application.application_status.name.toLowerCase() === "submitted";

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.jobs.role_name}
            </h3>
            <p className="text-sm text-gray-500">
              Ref: {application.jobs.reference_number}
            </p>
          </div>
          <Tag color={getStatusColor(application.application_status.name)}>
            {application.application_status.name}
          </Tag>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <ClockCircleOutlined />
          <span>Applied {dayjs(application.created_at).fromNow()}</span>
        </div>

        <div className="text-xs text-gray-400">
          Last updated:{" "}
          {dayjs(application.updated_at).format("DD MMM YYYY, HH:mm")}
        </div>

        <div className="pt-2 flex gap-4">
          <Button
            type="default"
            className="hover:opacity-80"
            onClick={() =>
              router.push(`/job?reference=${application.jobs.reference_number}`)
            }
          >
            View Description
          </Button>
          {canWithdraw && (
            <Button danger className="hover:opacity-80" onClick={onWithdraw}>
              Withdraw Application
            </Button>
          )}
        </div>
      </div>
      <WithdrawModal
        application={application}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Card>
  );
}
