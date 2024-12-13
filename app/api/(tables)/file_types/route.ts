import { type NextRequest, NextResponse } from "next/server";
import { create, client, update, delete_row } from "../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client.from("file_types").select();
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched file types",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "file_types" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created file type",
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
    const { data, error } = await update({ body, table: "file_types", id });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated file type",
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
    const { data, error } = await delete_row({ table: "file_types", id });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully deleted file type",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
