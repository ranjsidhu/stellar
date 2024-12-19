import {
  ProfileOutlined,
  SolutionOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import UserProfile from "../(pages)/profile/user/(profile)/UserProfile";
import UserApplications from "../(pages)/profile/user/UserApplications";
import UserDocuments from "../(pages)/profile/user//UserDocuments";
import UserSettings from "../(pages)/profile/user//UserSettings";
import { ProfileTab } from "../types";

const PROFILE_TABS: ProfileTab[] = [
  {
    label: "Profile",
    key: "profile",
    children: <UserProfile />,
    icon: <ProfileOutlined />,
  },
  {
    label: "Applications",
    key: "applications",
    children: <UserApplications />,
    icon: <SolutionOutlined />,
  },
  {
    label: "Documents",
    key: "documents",
    children: <UserDocuments />,
    icon: <FileTextOutlined />,
  },
  {
    label: "Settings",
    key: "settings",
    children: <UserSettings />,
    icon: <SettingOutlined />,
  },
];

export { PROFILE_TABS };
