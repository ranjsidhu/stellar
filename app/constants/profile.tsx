import {
  ProfileOutlined,
  SolutionOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ProfileTab } from "../types";

const PROFILE_TABS: ProfileTab[] = [
  {
    label: "Profile",
    key: "profile",
    children: "profile",
    icon: <ProfileOutlined />,
  },
  {
    label: "Applications",
    key: "applications",
    children: "applications",
    icon: <SolutionOutlined />,
  },
  {
    label: "Documents",
    key: "documents",
    children: "documents",
    icon: <FileTextOutlined />,
  },
  {
    label: "Settings",
    key: "settings",
    children: "settings",
    icon: <SettingOutlined />,
  },
];

export { PROFILE_TABS };
