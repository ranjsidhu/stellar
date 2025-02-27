"use client";

import { notification } from "antd";
import { NotificationType } from "@/app/types";
import { NotificationInstance } from "antd/es/notification/interface";
import { openNotification } from "@/app/utils";

let notificationApi: NotificationInstance;

export const notify = (
  type: NotificationType,
  message: string,
  description: string
) => {
  if (notificationApi) {
    openNotification(type, message, description, notificationApi);
  } else {
    console.error("Notification API is not initialized");
  }
};

export default function Notification() {
  const { useNotification } = notification;
  const [api, contextHolder] = useNotification();
  notificationApi = api;

  return <>{contextHolder}</>;
}
