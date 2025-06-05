import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ limit: string }> }
) {
  try {
    const { limit } = await params;
    if (!limit) {
      throw new Error("The limit is undefined");
    }
    const jobs = await prisma.jobs.findMany({
      where: { is_deleted: false },
      orderBy: { created_at: "desc" },
      take: Number(limit),
    });

    return NextResponse.json({
      message: `Successfully fetched ${jobs.length} jobs`,
      response: jobs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
