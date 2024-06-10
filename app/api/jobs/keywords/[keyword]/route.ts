import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../utils/db-client";

export async function GET(
  req: NextRequest,
  { params }: { params: { keyword: string } }
) {
  try {
    const { data, error } = await client.rpc("search_jobs_by_keywords", {
      query: params.keyword,
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
