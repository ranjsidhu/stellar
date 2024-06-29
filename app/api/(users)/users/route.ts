import { NextRequest, NextResponse } from "next/server";
import { create } from "@/app/api/utils/db-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({
      body,
      table: "users",
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({
      message: "Successfully created user",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
