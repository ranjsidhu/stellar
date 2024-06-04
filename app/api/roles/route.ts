import { NextRequest, NextResponse } from "next/server";
const { client, create } = require("@/app/api/utils/db-client");

export async function POST(req: NextRequest) {
  try {
    const { name, label } = await req.json();
    const { data, error } = await create({
      body: { name, label },
      table: "roles",
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created role",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error });
  }
}
