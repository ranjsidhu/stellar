import { SetStateAction } from "react";

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
  subRoutes?: { name: string; route: string }[];
};

type AccordionProps = {
  name: string;
  route?: string;
  subRoutes?: { name: string; route: string }[];
  toggleMenu?: () => void;
  handleOnClick?: () => void;
};

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
  subRoutes?: { name: string; route: string }[];
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
  type AccordionProps,
  type NavButtonProps,
  type FiltersProps,
  type LatestJobCardProps,
  type MobileMenuProps,
};
