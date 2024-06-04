import { NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: { limit: number } }
) {
  try {
    const limit = params.limit;
    if (!limit) {
      throw new Error("The limit is undefined");
    }
    const { data, error } = await client
      .from("testimonials")
      .select()
      .limit(limit);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully fetched ${limit} testimonials`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
