import { NextResponse } from "next/server";
import { client } from "../../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client
      .from("users")
      .select(
        "id, first_name, last_name, role_id, last_logged_in, roles (name)"
      )
      .eq("is_deleted", false);
    if (error) throw new Error(error.message);

    const users = data.map((user: any) => ({
      ...user,
      role: user.roles.name,
    }));

    return NextResponse.json({
      response: users,
      message: "Successfully fetched users",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
