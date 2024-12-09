import { type NextRequest, NextResponse } from "next/server";
import { create, client, update, delete_row } from "../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client
      .from("config_tables")
      .select()
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched config tables",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "config_tables" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created config table record",
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
    const { data, error } = await update({
      body,
      table: "config_tables",
      id,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated config table record",
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
      table: "config_tables",
      id,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully deleted config table record",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
