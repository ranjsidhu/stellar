import { type NextRequest, NextResponse } from "next/server";
import { create } from "../../utils/db-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "user_applications" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created user application",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
