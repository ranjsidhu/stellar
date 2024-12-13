import {
  BaseParams,
  PatchParams,
  CustomPatchParams,
  UpsertParams,
  DeleteParams,
} from "@/app/types";

const { createClient } = require("@supabase/supabase-js");

const { NEXT_PUBLIC_DB_URL, NEXT_PUBLIC_DB_API_ANON_KEY } = process.env;
const client = createClient(NEXT_PUBLIC_DB_URL, NEXT_PUBLIC_DB_API_ANON_KEY);

const create = async ({ body, table }: BaseParams) => {
  const { data, error } = await client.from(table).insert(body).select();
  return { data, error };
};

const update = async ({ body, table, id }: PatchParams) => {
  const { data, error } = await client
    .from(table)
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();
  return { data, error };
};

const custom_update = async ({
  body,
  table,
  updateColumn,
  updateValue,
}: CustomPatchParams) => {
  delete body.id;
  const { data, error } = await client
    .from(table)
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq(updateColumn, updateValue)
    .select();
  return { data, error };
};

const upsert = async ({ table, values }: UpsertParams) => {
  const { data, error } = await client.from(table).upsert(values).select();
  return { data, error };
};

const delete_row = async ({ table, id }: DeleteParams) => {
  const { data, error } = await client
    .from(table)
    .delete()
    .eq("id", id)
    .select();
  return { data, error };
};

export { client, create, update, custom_update, upsert, delete_row };
