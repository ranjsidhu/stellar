/* eslint-disable no-unused-vars */
import React, { SetStateAction, Dispatch } from "react";
import { BasicTable } from "./db";

type Job = {
  id: number;
  role_name: string;
  location: string;
  salary_range: string;
  reference_number: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
};

type Testimonial = {
  id: number;
  author: string;
  testimonial: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
};

type JobLocation = {
  location: string;
  location_count: number;
};

type JobProps = {
  job: Job;
};

type NotificationType = "success" | "info" | "warning" | "error";

type RegisterType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dob: Date | string;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  dob: Date | string;
  email: string;
  phone: null | string;
  first_line_address: string;
  town: string;
  city: string | null;
  postcode: string;
  role_id: number;
  roles: { name: string };
  last_logged_in: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  is_deleted: boolean | null;
  deleted_at: Date | string | null;
};

type SearchProps = {
  source: string;
};

type StepProps = {
  title: string;
  description: string;
  index: number;
};

type Route = {
  route: string;
  name: string;
  subRoutes?: Subroute[];
};

type Subroute = {
  name: string;
  route: string;
};

type MobileAccordionProps = {
  name: string;
  route?: string;
  subRoutes?: Subroute[];
  toggleMenu?: () => void;
  handleOnClick?: () => void;
};

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
  subRoutes?: Subroute[];
};

type FiltersProps = {
  setDisplayJobs: React.Dispatch<SetStateAction<Job[]>>;
};

type LatestJobCardProps = {
  job: Job;
};

type MobileMenuProps = {
  toggleMenu: () => void;
  role: string | null | undefined;
};

type AdminCardProps = {
  title: string;
  description: string;
  route: string;
};

type AdminConfigCardProps = AdminCardProps & {
  table: string;
  refreshTableData: () => void;
};

type ConfigTable = {
  id: number;
  table_name: string;
  ui_name: string;
  description: string;
  is_enabled: boolean;
  created_at: Date;
  updated_at: Date;
};

type TabKey = "profile" | "applications" | "documents" | "settings";

interface ProfileTab {
  label: string;
  key: TabKey;
  children: React.ReactNode;
  icon: React.ReactNode;
}

type ComponentChildren = Readonly<{
  children: React.ReactNode;
}>;

type FileType = {
  name: string;
};

type Document = {
  id: number;
  filename: string;
  file_id: string;
  file_types: FileType;
};

type JobApplication = {
  id: number;
  role_name: string;
  reference_number: string;
};

type Application = {
  id: number;
  created_at: string;
  updated_at: string;
  application_status: { name: string };
  jobs: JobApplication;
};

type ApplicationCardProps = {
  application: Application;
  onWithdraw: () => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type DocumentCardProps = {
  document: Document;
  onDownload?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onPreview?: (document: Document) => void;
};

type AdminJob = {
  job: Job & {
    job_status: { name: string; id: number };
    user_applications: {
      users: { id: number; first_name: string; last_name: string };
    }[];
  };
  jobStatuses: BasicTable[];
};

type AuthenticatedButtonsType = {
  role: string;
};

type SectionLoadingProps = { loading: boolean } & ComponentChildren;

type DeleteModalProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmLoading: boolean;
  setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  refreshTableData: () => void;
  table: string;
};

type ButtonProps = {
  type: "primary" | "submit";
  onClick?: () => void;
};

type AccordionProps = {
  items: ({
    label: string;
  } & ComponentChildren)[];
};

type HeaderProps = { role: string | undefined | null };

type LayoutProps = {
  role: string | undefined | null;
} & ComponentChildren;

type WithdrawModalProps = {
  application: Application;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export {
  type Job,
  type Testimonial,
  type JobLocation,
  type JobProps,
  type NotificationType,
  type RegisterType,
  type User,
  type SearchProps,
  type StepProps,
  type Route,
  type MobileAccordionProps,
  type FiltersProps,
  type LatestJobCardProps,
  type MobileMenuProps,
  type MenuItemProps,
  type AdminCardProps,
  type ConfigTable,
  type AdminConfigCardProps,
  type ProfileTab,
  type DocumentCardProps,
  type Application,
  type AdminJob,
  type ComponentChildren,
  type AuthenticatedButtonsType,
  type SectionLoadingProps,
  type DeleteModalProps,
  type ButtonProps,
  type AccordionProps,
  type HeaderProps,
  type LayoutProps,
  type ApplicationCardProps,
  type WithdrawModalProps,
};
