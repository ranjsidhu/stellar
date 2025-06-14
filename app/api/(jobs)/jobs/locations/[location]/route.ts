import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ location: string }> }
) {
  try {
    const { location } = await params;
    if (!location) {
      throw new Error("The location is undefined");
    }
    const jobs = await prisma.jobs.findMany({
      where: { location, is_deleted: false },
      orderBy: { created_at: "desc" },
    });

    const count = await prisma.jobs.count({
      where: { location, is_deleted: false },
    });

    return NextResponse.json({
      message: `Successfully fetched jobs in ${location}`,
      response: jobs,
      count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
