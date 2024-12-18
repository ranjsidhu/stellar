import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/api/utils/db-client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const { data, error } = await client
      .from("jobs")
      .select()
      .eq("reference_number", reference)
      .single();
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: `Successfully retrieved details for job ${reference}`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
