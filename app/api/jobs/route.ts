import { NextRequest, NextResponse } from "next/server";
const { create } = require("@/app/api/utils/db-client");
import { JobRequest } from "@/app/types";

export async function POST(req: NextRequest) {
  try {
    const body: JobRequest = await req.json();
    const { data, error } = await create({
      body,
      table: "jobs",
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created job",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
