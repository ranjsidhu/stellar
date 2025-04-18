type JobRequest = {
  role_name: string;
  location: string;
  salary_range: string;
  reference_number: string;
  description: string;
};

type UniLevelType = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
};

type UserDocumentType = {
  file_id: string;
  file_types: { name: string };
  filename: string;
  id: number;
};

type GraduatesType = {
  id: number;
  full_name: string;
  contact_number: string;
  email: string;
  course: string;
  institution: string;
  in_progress: boolean;
  estimated_completion_date: string;
  university_levels: { name: string };
  created_at: Date | string;
  updated_at: Date | string;
};

export type { JobRequest, UniLevelType, UserDocumentType, GraduatesType };
