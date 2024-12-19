"use client";

import { Tabs } from "antd";
import { PageLayout } from "@/app/components";
import { PROFILE_TABS } from "@/app/constants";

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

  return (
    <PageLayout>
      <Tabs
        tabPosition="top"
        items={PROFILE_TABS.map((tab) => {
          return {
            label: tab.label,
            key: tab.key,
            children: tab.children,
            icon: tab.icon,
          };
        })}
      />
    </PageLayout>
  );
}
