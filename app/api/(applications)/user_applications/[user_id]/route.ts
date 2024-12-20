import { type NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    if (!user_id) {
      throw new Error("The user_id is undefined");
    }
    const { data, error } = await client
      .from("user_applications")
      .select(
        "id, created_at, updated_at, jobs(id, role_name, reference_number), application_status(name)"
      )
      .eq("user_id", user_id)
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: "Successfully fetched user applications",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
