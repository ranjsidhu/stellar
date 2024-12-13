import { type NextRequest, NextResponse } from "next/server";
import { create, client, update, delete_row } from "../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client
      .from("job_status")
      .select()
      .eq("is_deleted", false)
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched job statuses",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "job_status" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created job status",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const { data, error } = await update({ body, table: "job_status", id });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated job status",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const { data, error } = await delete_row({ table: "job_status", id });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully deleted job status",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
