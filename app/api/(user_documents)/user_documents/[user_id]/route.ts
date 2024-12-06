import { type NextRequest, NextResponse } from "next/server";
const { client } = require("@/app/api/utils/db-client");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    if (!user_id) {
      throw new Error("The user_id is undefined");
    }
    const { data, error } = await client
      .from("user_documents")
      .select("*, file_types(name)")
      .eq("user_id", user_id);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: "Successfully fetched user documents",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
