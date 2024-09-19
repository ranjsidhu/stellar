import { type NextRequest, NextResponse } from "next/server";
import { create, client, update } from "../../utils/db-client";

const { NEXT_PUBLIC_CV_BUCKET } = process.env;

export async function GET() {
  try {
    const { data, error } = await client.from("user_documents").select();
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched user documents",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "user_documents" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created user document",
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
    if (!id) throw new Error("The id is undefined");
    const { data, error } = await update({ body, table: "user_documents", id });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated user document",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { file_id } = body;
    if (!file_id) throw new Error("The file_id is undefined");
    const { error } = await client.storage
      .from(NEXT_PUBLIC_CV_BUCKET)
      .remove([file_id]);
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully deleted user document",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
