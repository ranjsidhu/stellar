import { NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ limit: string }> }
) {
  try {
    const { limit } = await params;
    if (!limit) {
      throw new Error("The limit is undefined");
    }
    const { data, error } = await client
      .from("jobs")
      .select()
      .limit(limit)
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched ${limit} jobs`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
