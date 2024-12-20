"use client";

import { useEffect, useState } from "react";
import { Empty } from "antd";
import { notify, SectionLoading } from "@/app/components";
import { Application } from "@/app/types";
import { getUserId } from "@/app/utils/storage";
import ApplicationCard from "./(applications)/ApplicationCard";

export default function UserApplications() {
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await fetch(`/api/user_applications/${userId}`);
        const data = await response.json();
        setUserApplications(data.response);
      } catch (error) {
        notify(
          "error",
          "Error",
          "An error occurred while fetching user applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserApplications();
  }, []);

  if (!userApplications.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Empty description="No applications found" className="text-gray-500" />
      </div>
    );
  }

  return (
    <SectionLoading loading={loading}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Your applications
          </h1>
          <div className="text-sm text-gray-500">
            Total: {userApplications.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onWithdraw={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </div>
    </SectionLoading>
  );
}
