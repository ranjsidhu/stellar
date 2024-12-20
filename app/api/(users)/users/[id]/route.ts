import { NextRequest, NextResponse } from "next/server";
const { update } = require("@/app/api/utils/db-client");

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (!id) {
      throw new Error("The id is undefined");
    }
    const { data, error } = await update({
      body,
      table: "users",
      id,
    });
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: "Successfully updated user",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
