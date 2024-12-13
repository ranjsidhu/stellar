type RequestBody = { [key: string]: number | string | Date };

type BaseParams = {
  body: RequestBody;
  table: Tables;
};

type PatchParams = BaseParams & {
  id: number;
};

type DeleteParams = {
  id: number;
  table: Tables;
};

type CustomPatchParams = BaseParams & {
  updateColumn: string;
  updateValue: number | string | Date;
};

type UpsertParams = {
  table: Tables;
  values: { [key: string]: number | string | Date };
};

type BasicTable = {
  id: number | null;
  name: string;
  created_at: Date;
  updated_at: Date;
};

type Tables =
  | "jobs"
  | "referrals"
  | "roles"
  | "schools"
  | "testimonials"
  | "users"
  | "file_types"
  | "user_documents"
  | "graduates"
  | "university_levels"
  | "job_status"
  | "application_status"
  | "user_applications"
  | "config_tables";

export {
  type BaseParams,
  type PatchParams,
  type CustomPatchParams,
  type UpsertParams,
  type DeleteParams,
  type BasicTable,
};
