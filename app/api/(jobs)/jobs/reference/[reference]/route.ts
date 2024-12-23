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
      .select(
        `
          *, 
          job_status(name, id), 
          user_applications(
            users(
              id,
              first_name,
              last_name
            )
          )
        
        `
      )
      .eq("reference_number", reference)
      .eq("is_deleted", false)
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const body = await req.json();
    const { data, error } = await client
      .from("jobs")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("reference_number", reference);
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: `Successfully updated job ${reference}`,
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
