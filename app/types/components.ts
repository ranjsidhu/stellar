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
};
