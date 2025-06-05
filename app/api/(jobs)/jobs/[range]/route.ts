import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ range: string }> }
) {
  try {
    const { range } = await params;
    if (!range) {
      throw new Error("The range is undefined");
    }
    const MIN = Number(range) * 10 - 10;
    const jobs = await prisma.jobs.findMany({
      where: { is_deleted: false },
      orderBy: { created_at: "desc" },
      skip: MIN,
      take: 10,
    });

    return NextResponse.json({
      message: `Successfully fetched ${jobs.length} jobs`,
      response: jobs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
