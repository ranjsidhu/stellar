import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      throw new Error("The id is undefined");
    }
    const job_status = await prisma.job_status.findUnique({
      where: { id: parseInt(id) },
    });
    if (!job_status) {
      throw new Error("Job status not found");
    }

    return NextResponse.json({
      message: `Successfully fetched job status`,
      response: job_status,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
