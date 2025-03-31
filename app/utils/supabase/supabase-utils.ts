"use server";

import { createClient } from "./server";

export async function getRole() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return user?.role ?? null;
}
