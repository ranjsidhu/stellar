import { Tabs } from "antd";
import { PageLayout } from "@/app/components";
import { PROFILE_TABS } from "@/app/constants";

export default function Profile() {
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
