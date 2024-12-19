"use client";

import { Tabs } from "antd";
import { PageLayout } from "@/app/components";
import { PROFILE_TABS } from "@/app/constants";
import type { TabKey } from "@/app/types";
import UserProfile from "./user/(profile)/UserProfile";
import UserApplications from "./user/UserApplications";
import UserDocuments from "./user/UserDocuments";
import UserSettings from "./user/UserSettings";
// import { downloadFile } from "@/app/utils";

export default function Profile() {
  // const handleClick = async () => {
  //   fetch("/api/bucket/cv/6d655c14-ea3b-48f1-bacb-b149cd652ceb.docx").then(
  //     (res) => {
  //       res.blob().then((data) => {
  //         const filename = res.headers.get("X-Filename") || "download.docx";
  //         downloadFile(data, filename);
  //       });
  //     }
  //   );
  // };

  const TAB_CONTENT_MAP: Record<TabKey, React.FC> = {
    profile: UserProfile,
    applications: UserApplications,
    documents: UserDocuments,
    settings: UserSettings,
  };

  return (
    <PageLayout>
      <Tabs
        tabPosition="top"
        items={PROFILE_TABS.map((tab) => {
          const TabComponent = TAB_CONTENT_MAP[tab.children];
          return {
            label: tab.label,
            key: tab.key,
            children: <TabComponent />,
            icon: tab.icon,
          };
        })}
      />
    </PageLayout>
  );
}
