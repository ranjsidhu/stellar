/* -disable import/no-unused-modules */
/* -disable no-unused-vars */
import React, { SetStateAction, Dispatch } from "react";
import { BasicTable } from "./db";
import type { Session } from "next-auth";
import { users } from "../../generated/prisma";

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
  first_name: string | null;
  last_name: string | null;
  dob: Date | null;
  email: string;
  phone: string | null;
  first_line_address: string | null;
  town: string | null;
  city: string | null;
  postcode: string | null;
  roles: { id: number; name: string | null } | null;
};

type UserRole = {
  id: users["id"];
  first_name: users["first_name"];
  last_name: users["last_name"];
  full_name: string;
  email: users["email"];
  last_logged_in: users["last_logged_in"];
  role: string;
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
  setTotal: React.Dispatch<SetStateAction<number | undefined>>;
};

type LatestJobCardProps = {
  job: Job;
};

type MobileMenuProps = {
  toggleMenu: () => void;
  session: Session | null;
  userDetails: User | null;
};

type NavbarProps = Readonly<{
  userDetails: User | null;
}>;

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

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

type WithdrawModalProps = {
  application: Application;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type SocialsProps = {
  className: string | undefined;
  pathname?: string;
};

type Role = "Admin" | "Recruiter" | "Candidate";

type AuthWrapperProps = Readonly<{
  children: React.ReactNode;
  role?: Role | Role[];
}>;

type UserCardProps = Readonly<{
  user: UserRole;
  onRoleChange: (id: number, newRole: string) => void;
}>;

export type {
  Job,
  Testimonial,
  JobLocation,
  JobProps,
  NotificationType,
  RegisterType,
  User,
  SearchProps,
  StepProps,
  Route,
  MobileAccordionProps,
  FiltersProps,
  LatestJobCardProps,
  MobileMenuProps,
  MenuItemProps,
  AdminCardProps,
  ConfigTable,
  AdminConfigCardProps,
  ProfileTab,
  DocumentCardProps,
  Application,
  AdminJob,
  ComponentChildren,
  SectionLoadingProps,
  DeleteModalProps,
  ButtonProps,
  AccordionProps,
  LayoutProps,
  ApplicationCardProps,
  WithdrawModalProps,
  SocialsProps,
  NavbarProps,
  AuthWrapperProps,
  Role,
  UserRole,
  UserCardProps,
};
