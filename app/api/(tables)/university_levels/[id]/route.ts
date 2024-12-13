import { NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      throw new Error("The id is undefined");
    }
    const { data, error } = await client
      .from("university_levels")
      .select()
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched university level`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
