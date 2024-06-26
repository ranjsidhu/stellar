type RequestBody = { [key: string]: number | string | Date };

type BaseParams = {
  body: RequestBody;
  table: Tables;
};

type CreateParams = {
  body: RequestBody;
  table: Tables;
};

type PatchParams = BaseParams & {
  id: number;
};

type CustomPatchParams = BaseParams & {
  updateColumn: string;
  updateValue: number | string | Date;
};

type UpsertParams = {
  table: Tables;
  values: { [key: string]: number | string | Date };
};

type Tables =
  | "jobs"
  | "referrals"
  | "roles"
  | "schools"
  | "testimonials"
  | "users";

export {
  type RequestBody,
  type BaseParams,
  type CreateParams,
  type PatchParams,
  type CustomPatchParams,
  type UpsertParams,
  type Tables,
};
