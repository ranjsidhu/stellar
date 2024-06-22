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

export {
  type Job,
  type Testimonial,
  type JobLocation,
  type JobProps,
  type NotificationType,
};
