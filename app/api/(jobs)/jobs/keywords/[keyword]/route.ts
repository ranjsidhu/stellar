import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../utils/db-client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ keyword: string }> }
) {
  try {
    const { keyword } = await params;
    const { data, error } = await client.rpc("search_jobs_by_keywords", {
      query: keyword,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({
      messasge: "Successfully retrieved job locations",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
