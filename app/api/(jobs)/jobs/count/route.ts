import { NextResponse } from "next/server";
import { client } from "../../../utils/db-client";

export async function GET() {
  try {
    const { count, error } = await client
      .from("jobs")
      .select("", { count: "exact", head: true })
      .eq("is_deleted", false);
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched job count",
      response: count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
