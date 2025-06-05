import { NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const count = await prisma.jobs.count({
      where: { is_deleted: false },
    });
    return NextResponse.json({
      message: "Successfully fetched job count",
      response: count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
