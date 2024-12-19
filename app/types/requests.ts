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

export { type JobRequest, type UniLevelType, type UserDocumentType };
