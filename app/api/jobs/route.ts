import { NextResponse } from "next/server";
import instance from "@/app/utils/instance";

export async function GET() {
  const {
    data: { data: jobs },
  } = await instance.get("/jobs");
  return NextResponse.json({ ...jobs });
}
