import { NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: { range: number } }
) {
  try {
    const { range } = await params;
    if (!range) {
      throw new Error("The range is undefined");
    }
    const MIN = range * 10 - 10;
    const MAX = MIN + 9;
    const { data, error } = await client
      .from("jobs")
      .select()
      .range(MIN, MAX)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched ${data.length} jobs`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
