import { NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: { location: string } }
) {
  try {
    const location = params.location;
    if (!location) {
      throw new Error("The location is undefined");
    }
    const { data, error } = await client
      .from("jobs")
      .select()
      .eq("location", location);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched jobs in ${location}`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
