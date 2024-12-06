import { type NextRequest, NextResponse } from "next/server";
import { create, client, update, delete_row } from "../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client.from("application_status").select();
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched application types",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "application_status" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created application type",
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
    const { data, error } = await update({
      body,
      table: "application_status",
      id,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated application type",
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
    const { data, error } = await delete_row({
      table: "application_status",
      id,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully deleted application type",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
