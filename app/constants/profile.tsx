import {
  ProfileOutlined,
  SolutionOutlined,
  FileTextOutlined,
  SettingOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";
import UserProfile from "../(pages)/profile/user/(profile)/UserProfile";
import UserApplications from "../(pages)/profile/user/UserApplications";
import UserDocuments from "../(pages)/profile/user/(documents)/UserDocuments";
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

const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "doc":
    case "docx":
      return <FileWordOutlined className="text-blue-500 text-2xl" />;
    case "pdf":
      return <FilePdfOutlined className="text-red-500 text-2xl" />;
    case "xls":
    case "xlsx":
      return <FileExcelOutlined className="text-green-500 text-2xl" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FileImageOutlined className="text-purple-500 text-2xl" />;
    default:
      return <FileOutlined className="text-gray-500 text-2xl" />;
  }
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "submitted":
      return "blue"; // Initial status
    case "screening":
      return "processing"; // In progress
    case "shortlisted":
      return "cyan"; // Positive progress
    case "interviewing":
      return "geekblue"; // Active stage
    case "assessment":
      return "purple"; // Active evaluation
    case "reference check":
      return "volcano"; // Verification stage
    case "offer pending":
      return "magenta"; // Pre-offer
    case "offered":
      return "gold"; // Offer made
    case "accepted":
      return "success"; // Positive outcome
    case "rejected":
      return "error"; // Negative outcome
    case "withdrawn":
      return "default"; // Cancelled
    case "on hold":
      return "warning"; // Paused
    case "waitlisted":
      return "orange"; // In queue
    default:
      return "default";
  }
};

export { PROFILE_TABS, getFileIcon, getStatusColor };
