import { type NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string; job_id: string }> }
) {
  try {
    const { user_id, job_id } = await params;
    if (!user_id) {
      throw new Error("The user_id is undefined");
    }
    const { data, error } = await client
      .from("user_applications")
      .select("id")
      .eq("user_id", user_id)
      .eq("job_id", job_id);

    if (error) {
      throw new Error(error.message);
    }

    if (!data.length) {
      return NextResponse.json({
        message: "User has not applied for this job",
        applied: false,
      });
    }

    if (data.length && data[0].id) {
      return NextResponse.json({
        message: "User has already applied for this job",
        applied: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
