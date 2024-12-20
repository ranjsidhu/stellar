import { type NextRequest, NextResponse } from "next/server";
import { create, client, update, delete_row } from "../../utils/db-client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (name) {
      const { data, error } = await client
        .from("application_status")
        .select()
        .eq("name", name)
        .single();
      if (error) throw new Error(error.message);
      return NextResponse.json({
        message: "Successfully fetched application status",
        response: data,
      });
    } else {
      const { data, error } = await client
        .from("application_status")
        .select()
        .eq("is_deleted", false)
        .order("id", { ascending: true });
      if (error) throw new Error(error.message);
      return NextResponse.json({
        message: "Successfully fetched application statuses",
        response: data,
      });
    }
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
      message: "Successfully created application status",
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
      table: "application_status",
      id,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated application status",
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
      message: "Successfully deleted application status",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
