import { NextResponse } from "next/server";
import { client } from "../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client.rpc("getdistinctlocations");

    if (error) throw new Error(error.message);

    return NextResponse.json({
      messasge: "Successfully retrieved job locations",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
